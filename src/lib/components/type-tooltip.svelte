<script lang="ts">
const { name, markdown } = $props();
</script>

<div class="tooltip" id="Tooltip-{name}" style="position-anchor: --anchor-{name}" popover>{@html markdown}</div>

<style>
	.tooltip {
		border-radius: 5px;
		box-shadow: #1a1f23 0 4px 8px -2px;
		overflow: hidden;
		border: 2px solid #595959;
		position-area: bottom;
		position-try-fallbacks: flip-block;
		margin-block: 10px;
		width: max-content;
		max-width: calc(100vw - 30px);
		padding: 0;
		background: none;
	}

	:global(.tooltip code.hljs) {
		background-color: #162a3d;
	}
</style>
