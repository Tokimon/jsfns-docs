<script lang="ts">
const { allVersions, version, packageName } = $props();
</script>

<div class="package-version">
	{#if allVersions.length > 1}
		<button class="version current-version" popovertarget="version-list">v. {version}</button>
		<ul class="version-list" id="version-list" popover>
			{#each allVersions as v}
				<li>
					{#if v === version}
						<div class="version selected">v. {v}</div>
					{:else}
						<a href="/{packageName}/{v}" class="version">v. {v}</a>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<div class="version current-version">v. {version}</div>
	{/if}
</div>

<style>
	.package-version {
		position: relative;
	}

	.version {
		cursor: default;
		display: block;
		white-space: nowrap;
		line-height: 2;
		padding: 0 15px;
		color: white;

		&.selected {
			background: var(--focus-color);
			color: black;
			cursor: default;
		}
	}

	.current-version {
		padding: 2px 15px;
		cursor: pointer;
		anchor-name: --version-trigger;
	}

	button.current-version {
		background: none;
		border: none;
		color: inherit;
		font: inherit;
	}

	.version-list {
		list-style: none;
		margin: 0;
		padding: 0;
		background: var(--module-bg-color);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		overflow: hidden;
		position-anchor: --version-trigger;
		position-area: bottom span-left;
	}
</style>
