<script lang="ts">
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { children } = $props();
	onMount(() => {
		// Send pageview on initial load
		gtag('event', 'page_view', { page_path: location.pathname });
	});

	afterNavigate(() => {
		gtag('event', 'page_view', { page_path: location.pathname });
	});
</script>

{@render children()}
