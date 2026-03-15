<script lang="ts">
let {
	modules,
	open = false,
	onclose,
	navEl = $bindable(),
}: {
	modules: { name: string }[];
	open?: boolean;
	onclose?: () => void;
	navEl?: HTMLElement;
} = $props();

function shortcutHint() {
	if (typeof navigator === 'undefined') return 'Ctrl+K';
	return /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl+K';
}

let inputEl: HTMLInputElement;
let filter = $state('');
let hasFocus = $state(false);
let currentHash = $state('');

const filtered = $derived(
	modules.filter((m) => m.name.toLowerCase().includes(filter.toLowerCase())),
);

function updateHash() {
	currentHash = location.hash;
}

$effect(() => {
	updateHash();
});

function clearFilter() {
	filter = '';
}

function handleLinkClick(e: MouseEvent) {
	if (window.matchMedia('(max-width: 799px)').matches) {
		onclose?.();
	} else {
		requestAnimationFrame(() => (e.target as HTMLElement).focus());
	}
}

function handleKeydown(e: KeyboardEvent) {
	const hasModifier = e.ctrlKey || e.metaKey || e.altKey;
	if (hasModifier) return;

	if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
		e.preventDefault();
		const focused = navEl?.querySelector('a:focus') as HTMLElement | null;

		if (!focused) {
			if (e.key === 'ArrowDown') {
				const current = navEl?.querySelector('a.current') as HTMLElement | null;
				(current ?? (navEl?.querySelector('.menu-list-item a') as HTMLElement))?.focus();
			}
			return;
		}

		const sibling =
			e.key === 'ArrowDown'
				? focused.parentElement?.nextElementSibling?.firstElementChild
				: focused.parentElement?.previousElementSibling?.firstElementChild;

		(sibling as HTMLElement)?.focus();
		return;
	}

	if (e.key === 'Home') {
		e.preventDefault();
		inputEl?.focus();
		return;
	}

	if (e.key === 'Delete') {
		e.preventDefault();
		clearFilter();
		inputEl?.focus();
		return;
	}

	if (e.key === 'Escape') {
		clearFilter();
		e.preventDefault();
		(document.activeElement as HTMLElement)?.blur();
		return;
	}

	// Printable character — redirect to filter input
	if (e.key.length === 1 && document.activeElement !== inputEl) {
		inputEl?.focus();
		return;
	}
}
</script>

<svelte:window onhashchange={updateHash} />

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<nav class="menu" class:open bind:this={navEl} onkeydown={handleKeydown} onfocusin={() => hasFocus = true} onfocusout={() => hasFocus = false} tabindex="0">
	<label class="menu-search">
        <input name='menu-filter' type="text" autocomplete="off" placeholder='Type to filter...' bind:value={filter} bind:this={inputEl} />
        <kbd>[{hasFocus ? 'Home' : shortcutHint()}]</kbd>
        <button class="clear-filter" onclick={clearFilter} aria-label='clear filter'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'>
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
            </svg>
        </button>
	</label>

	<ul class="menu-list">
		{#each filtered as module}
			<li class="menu-list-item">
				<a href="#{module.name}" class:current={currentHash === `#${module.name}`} onclick={handleLinkClick}>{module.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.menu {
		grid-area: nav;
		display: flex;
		flex-direction: column;
		position: fixed;
		z-index: 98;
		width: 300px;
		top: var(--header-hight);
		bottom: 0;
		left: 0;
		background: var(--module-bg-color);
		translate: -100% 0;
		transition: translate 0.3s ease;
		font-size: 18px;

		&.open {
			translate: 0;
		}

		&:focus-within {
			background: hsl(from var(--module-bg-color) h s calc(l + 5));
		}
	}

	.menu-list {
		margin: 0;
		padding: 10px 0;
		list-style: none;
		box-shadow: inset 0 0 0 transparent;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.menu-list-item {
		& a {
			color: #ccc;
			text-decoration: none;
			padding: 10px;
			display: block;
			transition: all 0.2s;

			&:hover,
			&:focus {
				background: rgba(255, 255, 255, 0.15);
				outline: none;
			}

			&:focus {
			    box-shadow: inset 5px 0 0 rgba(255, 255, 255, 0.15);
				padding-left: 20px;
			}

			&:focus-visible {
				outline-offset: -2px;
			}
		}

		a.current {
			background: rgba(122, 150, 174, 0.25);
			box-shadow: inset 5px 0 0 var(--focus-color);
			padding-left: 20px;
		}
	}

	.menu-search {
	    display: grid;
		align-items: center;
		border-radius: 4px;
		border: 1px solid var(--border-color);
		margin: 10px;
		transition: border 0.2s;
		grid-template-columns: 1fr auto;

		input {
		    background-color: transparent;
			border: none;
			flex: 1 1 auto;
			padding: 10px;
			padding-right: 30px;
			color: white;
			font-size: 14px;
			grid-column: 1/3;
			grid-row: 1/1;

			&:hover,
			&:focus {
			    outline: none;

				& ~ kbd {
                    opacity: 0;
				}

				& ~ .clear-filter {
                    opacity: 1;
				}
			}
		}

		.clear-filter {
		    padding: 5px;
			background: none;
			border: none;
			cursor: pointer;
			grid-column: 2/2;
            grid-row: 1/1;
            opacity: 0;
            transition: opacity 0.2s ease;
            justify-self: end;
            width: 30px;
			height: 30px;

			svg {
				fill: var(--focus-color);
			}
		}

		kbd {
		    pointer-events: none;
            font-size: 0.6rem;
            color: #888;
            padding: 1em;
            grid-column: 2/2;
            grid-row: 1/1;
            transition: opacity 0.2s ease;
		}

		&:focus-within {
			outline: none;
			border-color: var(--focus-color);
		}
	}

	@media (min-width: 800px) {
		.menu {
			translate: 0;
		}
	}
</style>
