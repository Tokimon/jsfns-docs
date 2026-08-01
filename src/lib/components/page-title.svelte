<script lang="ts">
	import { resolve } from '$app/paths';

	const { packageName } = $props();
</script>

<h2 class="page-title">
	@jsfns/
	<a href={resolve('/[package]', { package: 'core' })} class:selected={packageName === 'core'}>
		core
	</a>
	<a href={resolve('/[package]', { package: 'web' })} class:selected={packageName === 'web'}>web</a>
</h2>

<style>
	.page-title {
		margin: 0;
		font-size: 18px;
		display: flex;
		gap: 10px;
		align-items: center;

		a {
			color: currentColor;
			text-decoration: none;
			padding: 0.4rem 0.8rem;
			border: 1px solid var(--highlight);
			transition: background-color, border-color;
			transition-duration: 0.2s;
			border-radius: 4px;

			&:hover,
			&:focus,
			&.selected {
				background: var(--highlight);
				border-color: var(--highlight-contrast);
			}
		}
	}
</style>
