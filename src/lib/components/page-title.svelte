<script lang="ts">
	import { resolve } from '$app/paths';

	const { packageName } = $props();
</script>

<h2 class="page-title">
	@jsfns/
	<a href={resolve('/[package]', { package: 'core' })} class:selected={packageName === 'core'}
		>core</a
	>
	<a href={resolve('/[package]', { package: 'web' })} class:selected={packageName === 'web'}>web</a>
</h2>

<style>
	.page-title {
		margin: 0;
		font-size: 18px;
		flex: 1 1 100%;
		display: flex;
		gap: 10px;
		align-items: center;

		& a {
			color: currentColor;
			text-decoration: none;
			padding: 5px 10px;
			border: 1px solid var(--border-color);
			transition: background-color 0.2s;
			border-radius: 4px;

			&:hover,
			&:focus,
			&.selected {
				background: var(--focus-color);
			}
		}
	}
</style>
