<script lang="ts">
import { url } from '$lib/url.js';

const { allVersions, version, packageName } = $props();
</script>

	{#if allVersions.length > 1}
		<button class="current-version" popovertarget="version-list">v. {version}</button>
		<ul class="version-list" id="version-list" popover>
			{#each allVersions as v}
				<li>
					{#if v === version}
						<div class="version selected">v. {v}</div>
					{:else}
						<a href={url(packageName, v)} class="version">v. {v}</a>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="current-version">v. {version}</div>
	{/if}

<style>

	.current-version,
	.version {

	cursor: pointer;
	white-space: nowrap;
	line-height: 2;
	padding: 0 15px;
	color: white;
	}

	.version {
	display: block;

		&:hover {
			background: #555;
		}

		&.selected {
			background: var(--focus-color);
			color: black;
			cursor: default;
		}
	}

	.current-version {

	background: none;
	color: inherit;
	font: inherit;
		padding: 5px 15px;
		border-radius: 5px;
		cursor: pointer;
		anchor-name: --version-trigger;
		border: 1px solid transparent;
		transition: border-color 0.2s ease;

		&:hover,
	&:focus-visible {
		    border-color: var(--focus-color);
		}
	}

	.version-list {
		list-style: none;
		margin: 5px 0 0 0;
		padding: 0;
		background: var(--module-bg-color);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		overflow: hidden;
		position-anchor: --version-trigger;
		position-area: bottom span-left;
	}
</style>
