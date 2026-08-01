<script lang="ts">
	// import ModuleSignature from './module-signature.svelte';
	import type { ResolvedPathname } from '$app/types';
	import type { ModuleEntry } from '$lib/doc-builder/type-parsing/prepareModules.js';

	const { module, href }: { module: ModuleEntry; href: ResolvedPathname } = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve  -->
<a class="module" {href} id={module.name} data-sveltekit-noscroll>
	<h3 class="definition">{module.name}(<b>text</b>)</h3>

	<p class="description">Some sort of description</p>

	<!-- <div class="signatures">
			{#each module.functions as func (func.definition)}
				<ModuleSignature {func} />
			{/each}
		</div> -->
</a>

<style>
	/*.module-content {
		background: var(--module-bg-color);
		border-radius: 5px;
		margin-block: 10px;
		transition: box-shadow 1s;


	}*/

	.module {
		background-color: var(--card-bg-color);
		border: 2px solid transparent;
		border-radius: 0.3rem;
		color: var(--text-color);
		outline: none;
		padding: 1.4rem 2rem;
		flex: 1;

		.definition {
			font-family: 'Courier New', Courier, monospace;
			font-size: 1.5rem;
			font-weight: 400;
			margin-block-end: 0.4rem;

			b {
				color: var(--light-gray);
				font-weight: normal;
			}
		}

		.description {
			font-size: 1rem;
			color: var(--light-gray);
		}

		&:hover,
		&:focus-visible {
			background-color: var(--highlight);
			border-color: var(--highlight-contrast);

			.definition b {
				color: var(--highlight-contrast);
			}
			.description {
				color: var(--highlight-dark);
			}
		}
	}

	/*.signatures {
		display: flex;
		flex-direction: column;
		gap: 15px;
		color: #aaa;
	}*/
</style>
