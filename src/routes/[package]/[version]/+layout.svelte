<script lang="ts">
	import { css } from '@jsfns/web/css';
	import { findById } from '@jsfns/web/findById';
	import { on } from '@jsfns/web/on';
	import { fuzzySearch } from '@jsfns/core/fuzzySearch';
	import { resolve } from '$app/paths';
	import ModuleSection from '$lib/components/module-section.svelte';
	import PackageVersion from '$lib/components/package-version.svelte';
	import PageTitle from '$lib/components/page-title.svelte';
	import TypeTooltip from '$lib/components/type-tooltip.svelte';
	import SearchInput from '$lib/components/search-input.svelte';

	import 'highlight.js/styles/github-dark.css';

	const { data, children } = $props();

	let search = $state('');
	const modules = $derived(
		search ? data.modules.filter((m) => fuzzySearch(m.name, search)) : data.modules,
	);

	const typeNames = $derived(new Set(data.customTypes.map((t) => t.name)));
	let activeAnchor: HTMLElement | null = null;

	function clearAnchor() {
		if (activeAnchor) {
			css(activeAnchor, 'anchor-name', null);
			activeAnchor = null;
		}
	}

	function handleTypeClick(e: MouseEvent) {
		const elm = (e.target as HTMLElement).closest('[data-custom-type]') as HTMLElement | null;
		if (!elm) return;

		const type = elm.dataset.customType;
		if (!type || !typeNames.has(type)) return;

		const tooltip = findById(`Tooltip-${type}`);
		if (!tooltip) return;

		// Same element clicked again — popover was just auto-closed, don't reopen
		if (elm === activeAnchor) {
			clearAnchor();
			return;
		}

		// Clean up any previous anchor
		clearAnchor();

		activeAnchor = elm;
		css(elm, 'anchor-name', `--anchor-${type}`);
		tooltip.showPopover();

		on(
			tooltip,
			'beforetoggle',
			() => {
				const anchor = activeAnchor;
				requestAnimationFrame(() => {
					if (activeAnchor === anchor) clearAnchor();
				});
			},
			{
				once: true,
				when: (e) => e.newState === 'closed',
			},
		);
	}
</script>

<svelte:head>
	<title>@jsfns/{data.packageName} v. {data.version}</title>
</svelte:head>

<main class="page">
	<header class="header">
		<PageTitle packageName={data.packageName} />

		<SearchInput bind:search style="margin-inline: auto; flex: 1 1 auto;" />

		<PackageVersion
			packageName={data.packageName}
			allVersions={data.allVersions}
			version={data.version}
		/>

		<a
			target="_blank"
			href="https://www.npmjs.com/package/@jsfns/{data.packageName}"
			class="repository"
		>
			<img src="https://static.npmjs.com/f1786e9b7cba9753ca7b9c40e8b98f67.png" alt="npm" />
		</a>

		<a
			target="_blank"
			href="https://github.com/Tokimon/jsfns/tree/main/packages/{data.packageName}"
			class="repository"
		>
			<img src="https://github.githubassets.com/favicons/favicon-dark.svg" alt="Github" />
		</a>
	</header>

	<!-- <ModuleMenu
		modules={data.modules}
		open={menuOpen}
		onclose={() => (menuOpen = false)}
		bind:navEl={menuNav}
	/> -->

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<ul class="modules" onclick={handleTypeClick}>
		{#each modules as module (module.name)}
			<li>
				<ModuleSection
					{module}
					href={resolve('/[package]/[version]/[module]', {
						package: data.packageName,
						version: data.version,
						module: module.name,
					})}
				/>
			</li>
		{/each}
	</ul>

	{#each data.customTypes as { name, markdown } (name)}
		<TypeTooltip {name} {markdown} />
	{/each}

	{@render children()}
</main>

<style>
	.page {
		display: grid;
		grid-template-rows: auto 1fr;
		grid-template-columns: 1fr;
		height: 100dvh;
	}

	.header {
		background-color: var(--header-bg-color);
		color: white;
		padding: 0 2rem;
		height: 4rem;
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.repository {
		flex: 0 0 auto;
	}

	.repository img {
		width: 1.8rem;
		aspect-ratio: 1;
	}

	.modules {
		margin: 0;
		padding: 1.5rem;
		overflow: auto;
		position: relative;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, 30rem);
		gap: 1rem;
		justify-content: center;
		align-content: start;

		li {
			display: flex;
		}
	}
</style>
