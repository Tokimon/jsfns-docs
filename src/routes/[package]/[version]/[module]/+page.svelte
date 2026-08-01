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
		<CloseIcon style="width: 1.7rem;" />
	</button>
</dialog>

<style>
	dialog {
		width: calc(100% - 10rem);
		max-width: 80rem;
		min-height: 600px;
		max-height: calc(100% - 10rem);
		border-radius: 1rem;
		transition-property: translate, opacity, zoom;
		transition-duration: 0.5s;
		outline: none;

		&::backdrop {
			backdrop-filter: blur(3px);
		}

		@starting-style {
			translate: 0 1rem;
			zoom: 0.95;
			opacity: 0;
		}
	}

	button.close {
		border-radius: 0.3rem;
		border: 1px solid var(--border-color);
		background: transparent;
		position: absolute;
		inset: 1rem 1rem auto auto;
		padding: 0 0.3rem;
		display: flex;
		align-items: center;
		aspect-ratio: 1/1;
	}
</style>
