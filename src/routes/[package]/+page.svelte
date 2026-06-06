<script lang="ts">
import { browser } from '$app/environment';

let { data } = $props();

if (browser) {
	window.location.replace(data.target + window.location.hash);
}
</script>
