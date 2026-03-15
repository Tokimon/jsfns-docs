<script lang="ts">
import { css } from '@jsfns/web/css';
import { findById } from '@jsfns/web/findById';
import { on } from '@jsfns/web/on';
import ModuleMenu from '$lib/components/module-menu.svelte';
import ModuleSection from '$lib/components/module-section.svelte';
import PackageVersion from '$lib/components/package-version.svelte';
import PageTitle from '$lib/components/page-title.svelte';
import TypeTooltip from '$lib/components/type-tooltip.svelte';
import 'highlight.js/styles/github-dark.css';

let { data } = $props();
let menuOpen = $state(false);
let menuNav = $state<HTMLElement>();

function handleGlobalKey(e: KeyboardEvent) {
	if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
		e.preventDefault();
		menuOpen = true;
		requestAnimationFrame(() => {
			const current = menuNav?.querySelector('a.current') as HTMLElement | null;
			if (current) {
				current.focus();
			} else {
				menuNav?.querySelector('input')?.focus();
			}
		});
	}
}

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

	on(tooltip, 'beforetoggle', () => requestAnimationFrame(clearAnchor), {
		once: true,
		when: (e) => e.newState === 'closed',
	});
}
</script>

<svelte:window onkeydown={handleGlobalKey} />

<svelte:head>
	<title>@jsfns/{data.packageName} v. {data.version}</title>
</svelte:head>

<main class="page">
	<header class="header">
		<button type="button" class="menu-trigger" aria-label="Toggle menu" onclick={() => (menuOpen = !menuOpen)}></button>

		<PageTitle packageName={data.packageName} />

		<PackageVersion packageName={data.packageName} allVersions={data.allVersions} version={data.version} />

		<a target="_blank" href="https://www.npmjs.com/package/@jsfns/{data.packageName}" class="repository">
			<img src="https://static.npmjs.com/f1786e9b7cba9753ca7b9c40e8b98f67.png" alt="npm" />
		</a>

		<a target="_blank" href="https://github.com/Tokimon/jsfns/tree/main/packages/{data.packageName}" class="repository">
			<img src="https://github.githubassets.com/favicons/favicon-dark.svg" alt="Github" />
		</a>
	</header>

	<ModuleMenu modules={data.modules} open={menuOpen} onclose={() => (menuOpen = false)} bind:navEl={menuNav} />

	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<article class="modules" onclick={handleTypeClick}>
		{#each data.modules as module}
			<ModuleSection {module} />
		{/each}
	</article>

	{#each data.customTypes as { name, markdown }}
		<TypeTooltip {name} {markdown} />
	{/each}
</main>

<style>
	.page {
		--header-hight: 50px;

		grid-template-areas:
			"header header"
			"nav content";
		grid-template-columns: 300px 1fr;

		@media (min-width: 800px) {
			display: grid;
		}
	}

	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		background-color: var(--header-color);
		color: white;
		padding: 0 10px;
		grid-area: header;
		height: var(--header-hight);
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.menu-trigger {
		width: 22px;
		height: 16px;
		border: 0;
		background: white
			linear-gradient(transparent, transparent 25%, var(--header-color) 25%, var(--header-color));
		background-repeat: repeat;
		background-size: 1px 7px;
		appearance: none;
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover {
			background-color: var(--hover-color);
		}

		&:focus {
			outline: none;
			background-color: var(--focus-color);
		}

		@media (min-width: 800px) {
			display: none;
		}
	}

	.menu-trigger,
	.repository {
		flex: 0 0 auto;
	}

	.repository img {
		width: 20px;
		aspect-ratio: 1;
	}

	.modules {
		container-type: inline-size;
		grid-area: content;
		padding: 0 15px var(--header-hight);
		overflow: hidden;
		position: relative;
		z-index: 9;
		transition: filter 0.2s;
	}
</style>
