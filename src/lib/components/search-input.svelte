<script lang="ts">
	import CloseIcon from '$lib/components/icons/close-icon.svelte';

	type Props = { search: string; style: string };
	// eslint-disable-next-line prefer-const
	let { style, search = $bindable() }: Props = $props();

	let inputEl: HTMLInputElement;

	const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);

	const clearFilter = () => (search = '');

	function onInputKeydown(e: KeyboardEvent) {
		const hasModifier = e.ctrlKey || e.metaKey || e.altKey;
		if (hasModifier || !inputEl) return;

		const isDelete = e.key === 'Delete';
		const isEscape = e.key === 'Escape';

		if (isDelete || isEscape) {
			e.preventDefault();
			clearFilter();

			if (isDelete) inputEl.focus();
			else inputEl.blur();
		}
	}

	function onWindowKeyDown(e: KeyboardEvent) {
		if (e.repeat) return;

		const hasModifier = isMac ? e.metaKey : e.ctrlKey;

		if (hasModifier && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			inputEl.focus();
		}
	}
</script>

<svelte:window onkeydown={onWindowKeyDown} />

<label class="field" {style}>
	<input
		name="menu-filter"
		type="text"
		autocomplete="off"
		placeholder="search..."
		onkeydown={onInputKeydown}
		bind:value={search}
		bind:this={inputEl}
	/>

	<kbd>
		[{#if !isMac}Ctrl-K{:else}⌘K{/if}]
	</kbd>

	<button class="clear-filter" onclick={clearFilter} aria-label="clear filter">
		<CloseIcon style="fill: var(--focus-color);" />
	</button>
</label>

<style>
	.field {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		border: 1px solid var(--highlight);
		border-radius: 0.5rem;
		align-items: center;
		min-width: 20rem;
		max-width: 35rem;

		input {
			background-color: transparent;
			border: none;
			padding-inline: 0.5rem 2.5rem;
			height: 2.5rem;
			color: var(--text-color);
			font-size: 1rem;
			grid-column: 1/3;
			grid-row: 1/1;
			outline: none;

			&::placeholder {
				color: var(--text-neutral-color);
			}
		}

		kbd {
			pointer-events: none;
			font-size: 1rem;
			color: var(--highlight-contrast);
			padding: 0 0.5em;
			grid-column: 2/2;
			grid-row: 1/1;
			transition: opacity 0.2s ease;
			white-space: nowrap;
		}

		.clear-filter {
			padding: 0.2rem;
			background: none;
			border: none;
			cursor: pointer;
			grid-column: 2/2;
			grid-row: 1/1;
			transition: opacity 0.2s ease;
			justify-self: end;
			width: 2rem;
			height: 2rem;
		}

		&:has(input:placeholder-shown),
		&:not(:focus-within) {
			.clear-filter {
				opacity: 0;
				pointer-events: none;
			}
		}

		&:focus-within {
			border-color: var(--highlight-contrast);
			kbd {
				opacity: 0;
			}
		}
	}
</style>
