<script lang="ts">
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	import { PUBLIC_WRITE_KEY_RUDDERSTACK, PUBLIC_DATA_PLANE_URI_RUDDERSTACK } from '$env/static/public';

	let { children } = $props();

	onMount(async () => {
		// Send pageview on initial load
		gtag('event', 'page_view', { page_path: location.pathname });

		// Only initialize RudderStack in production to avoid CORS issues in development
		if (!import.meta.env.DEV && localStorage.getItem('cookie_consent') === 'granted') {
			const { RudderAnalytics } = await import('@rudderstack/analytics-js');
			if (PUBLIC_WRITE_KEY_RUDDERSTACK && PUBLIC_DATA_PLANE_URI_RUDDERSTACK) {
				const rudderAnalytics = new RudderAnalytics();
				rudderAnalytics.load(
					PUBLIC_WRITE_KEY_RUDDERSTACK,
					PUBLIC_DATA_PLANE_URI_RUDDERSTACK
				);
				rudderAnalytics.page('Onboarding Loaded'); // Track initial page view
			} else {
				console.warn('RudderStack write key is not defined');
			}
		} else if (import.meta.env.DEV) {
			console.log('RudderStack disabled in development mode');
		}
	});

	afterNavigate(() => {
		gtag('event', 'page_view', { page_path: location.pathname });
	});
</script>

<CookieBanner />
{@render children()}
