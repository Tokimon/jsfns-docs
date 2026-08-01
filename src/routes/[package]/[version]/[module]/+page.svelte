<script lang="ts">
	import CloseIcon from '$lib/components/icons/close-icon.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types.js';

	const { data, params }: PageProps = $props();

	let dialogEl: HTMLDialogElement | undefined = $state();

	const backToRoot = () => goto(resolve('/[package]/[version]', params), { noScroll: true });

	$effect(() => dialogEl?.showModal());
</script>

<dialog bind:this={dialogEl} onclose={backToRoot} id={data.module.name}>
	<button class="close" type="button" onclick={() => dialogEl?.close()}>
		<CloseIcon class="icon" />
	</button>

	<code class="definition">{data.module.name}</code>
</dialog>

<style>
	dialog {
		--shadow-color: oklch(from var(--highlight-contrast) l c h / 0.8);

		width: calc(100% - 10rem);
		max-width: 80rem;
		min-height: 600px;
		max-height: calc(100% - 10rem);
		border-radius: 0.6rem;
		border: 0;
		box-shadow: 0 0.1rem 20rem -10rem var(--shadow-color);
		transition-property: opacity, zoom, box-shadow;
		transition-duration: 0.3s, 0.2s, 0.5s;
		outline: none;
		background-color: var(--dark-2);
		padding: 0;

		&::backdrop {
			backdrop-filter: blur(3px);
			background-color: oklch(from var(--dark-1) l c h / 0.4);

			transition: backdrop-filter, background-color;
			transition-duration: 0.3s;
		}

		@starting-style {
			zoom: 0.95;
			opacity: 0;
			box-shadow: 0 0 0 0 var(--shadow-color);

			&::backdrop {
				backdrop-filter: blur(0);
				background-color: oklch(from var(--dark-1) l c h / 0);
			}
		}
	}

	.close {
		border-radius: 0.4rem;
		background: transparent;
		position: absolute;
		inset: 1rem 1rem auto auto;
		padding: 0 0.3rem;
		display: flex;
		align-items: center;
		aspect-ratio: 1/1;
		border: 0;
		color: var(--white);
		cursor: pointer;

		:global(.icon) {
			width: 1.7rem;
			fill: currentColor;
			transition: rotate 0.2s;
		}

		&:hover,
		&:focus-visible {
			color: var(--highlight-contrast);
			outline: none;

			:global(.icon) {
				rotate: 90deg;
			}
		}
	}

	.definition {
		display: block;
		margin: 0;
		background: var(--dark-1);
		padding: 2rem 4rem;
		color: var(--white);
		font-size: 2rem;
	}
</style>
