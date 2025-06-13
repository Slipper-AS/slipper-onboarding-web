<script lang="ts">
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	let { children } = $props();
	onMount(() => {
		// Send pageview on initial load
		gtag('event', 'page_view', { page_path: location.pathname });
	});

	afterNavigate(() => {
		gtag('event', 'page_view', { page_path: location.pathname });
	});
</script>

<CookieBanner />
{@render children()}
