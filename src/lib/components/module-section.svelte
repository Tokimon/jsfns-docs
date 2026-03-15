<script lang="ts">
import ModuleSignature from './module-signature.svelte';

const { module } = $props();
</script>

<section class="module" id={module.name}>
	<div class="module-content">
		<h1><a href="#{module.name}"><b>#</b> {module.name}</a></h1>

		<div class="signatures">
			{#each module.functions as func}
				<ModuleSignature {func} />
			{/each}
		</div>
	</div>
</section>

<style>
	.module-content {
		background: var(--module-bg-color);
		border-radius: 5px;
		margin-block: 10px;
		transition: box-shadow 1s;

		& h1 {
			margin: 0;
			padding: 0 15px;
			line-height: 50px;
			font-size: 18px;
			font-weight: 400;
			border-top-left-radius: inherit;
			border-top-right-radius: inherit;

			b {
				color: gray;
				transition: color 0.2s;
			}

			a {
				color: currentColor;
				text-decoration: none;

				&:hover,
				&:focus {
					b {
						color: currentColor;
					}
				}
			}
		}

		&:hover {
			box-shadow: 0 0 3px 1px var(--hover-color);
			transition: box-shadow 0.2s;
		}
	}

	.module {
		padding-block: var(--header-hight);

		&:not(:last-child) {
		    border-bottom: 2px dashed var(--border-color);
		}

		&:target {
			.module-content,
			.module-content:hover {
				box-shadow: 0 0 3px 1px var(--focus-color);
			}
		}
	}

	.signatures {
		display: flex;
		flex-direction: column;
		gap: 15px;
		color: #aaa;
	}

	@container (min-width: 600px) {
		.module-content h1 {
			font-size: 25px;
		}
	}
</style>
