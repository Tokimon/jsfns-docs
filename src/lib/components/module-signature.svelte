<script lang="ts">
const { func } = $props();
</script>

<div class="signature">
	<div class="signature-definition">{@html func.definition}</div>

	<div class="signature-content">
		{#if func.comment}
			<div class="signature-description">{@html func.comment}</div>
		{/if}

		{#each func.remarks as remark}
			<fieldset class="signature-remark">
				<legend>Note</legend>
				{@html remark}
			</fieldset>
		{/each}

		{#if func.descriptions}
			<div class="signature-params">{@html func.descriptions}</div>
		{/if}

		{#if func.examples.length}
			<details class="examples">
				<summary>Examples</summary>
				{#each func.examples as example}
					{@html example}
				{/each}
			</details>
		{/if}

		{#if func.typesMarkdown}
			<details class="types">
				<summary>Types</summary>
				{@html func.typesMarkdown}
			</details>
		{/if}
	</div>
</div>

<style>
	.signature-content {
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 15px;
	}

	.signature-definition {
		font-size: 14px;
	}

	.signature-description {
		font-size: 18px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.signature-remark {
		padding: 10px;
		border: #81644b solid;
		border-width: 1px 0;
		color: #808080;
		width: fit-content;

		& legend {
			text-transform: uppercase;
			color: #ffa657;
			font-size: 11px;
			padding: 0 7px;
		}
	}

	@container (min-width: 750px) {
		.signature-definition {
			font-size: 20px;
		}
	}

	:global(summary) {
		font-size: 12px;
		cursor: pointer;
		color: gray;
		transition: color 150ms linear;

		&:hover,
		&:focus {
			color: var(--foldable-color);
			outline: none;
		}
	}

	:global(details[open] summary) {
		margin-bottom: 5px;
	}

	:global(pre code.hljs) {
		padding: 15px;
	}

	:global(code:not(.hljs)) {
		color: var(--property-color);
	}

	:global(code a) {
		color: inherit;
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	:global(.hljs-attr[title]) {
		cursor: help;
	}

	:global([data-custom-type]) {
		cursor: pointer;
		transition: outline 0.2s ease;
		border-radius: 4px;
		outline-offset: 5px;
		border-bottom: 1px dashed transparent;

		&:hover {
		    border-bottom-color: currentColor;
		}
	}

	/* Table */
	:global(table) {
		table-layout: auto;
		border-collapse: collapse;
	}

	:global(table th),
	:global(table td) {
		text-align: left;
		padding: 5px 10px;
		border: 0 solid var(--border-color);
		border-width: 0 0 1px;
	}

	:global(table th + th),
	:global(table th + td),
	:global(table td + th),
	:global(table td + td) {
		border-left-width: 1px;
	}

	:global(table tbody tr:last-child th),
	:global(table tbody tr:last-child td) {
		border-bottom: 0;
	}
</style>
