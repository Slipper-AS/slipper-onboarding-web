<script lang="ts">
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	import { page } from '$lib/services/analytics';

	let { children } = $props();

	onMount(async () => {
		// Send pageview on initial load
		gtag('event', 'page_view', { page_path: location.pathname });

		// Track page view if consent is granted
		if (localStorage.getItem('cookie_consent') === 'granted') {
			await page('Onboarding Loaded');
		}
	});

	afterNavigate(() => {
		gtag('event', 'page_view', { page_path: location.pathname });
	});
</script>

<CookieBanner />
{@render children()}
