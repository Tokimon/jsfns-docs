<script>
const { data } = $props();
</script>

<svelte:head>
	<title>@jsfns</title>
</svelte:head>

<main>
	<h1>@jsfns</h1>
	{#each data.packages as { name, version }}
		<a class="package-link" href="/{name}/{version}">{name} <small>v{version}</small></a>
	{/each}
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 50px;
	}

	.package-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border: 1px solid #444;
		border-radius: 4px;
		height: 100px;
		width: 100px;
		font-size: 20px;
		font-weight: 600;
		text-decoration: none;
		transition: background-color 0.2s;
		color: white;

		& small {
			color: green;
			font-size: 10px;
			position: absolute;
			translate: 0 -130%;
			margin: 0 auto;
			opacity: 0;
			transition:
				opacity 0.2s,
				translate 0.5s;
		}

		&:hover,
		&:focus {
			background: var(--focus-color);
			color: white;

			& small {
				opacity: 1;
				translate: 0 -230%;
			}
		}
	}
</style>
