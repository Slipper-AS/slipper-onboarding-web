<script lang="ts">
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	let { children } = $props();

	onMount(async () => {
		// Send pageview on initial load
		gtag('event', 'page_view', { page_path: location.pathname });

		if (localStorage.getItem('cookie_consent') === 'granted') {
			// Initialize RudderStack
			const rudderanalytics = await import('rudder-sdk-js');
			if (
				import.meta.env.PUBLIC_WRITE_KEY_RUDDERSTACK &&
				import.meta.env.PUBLIC_DATA_PLANE_URI_RUDDERSTACK
			) {
				rudderanalytics.load(
					import.meta.env.PUBLIC_WRITE_KEY_RUDDERSTACK,
					import.meta.env.PUBLIC_DATA_PLANE_URI_RUDDERSTACK
				);
				rudderanalytics.page('Onboarding Loaded'); // Track initial page view
			} else {
				console.warn('RudderStack write key is not defined');
			}
		}
	});

	afterNavigate(() => {
		gtag('event', 'page_view', { page_path: location.pathname });
	});
</script>

<CookieBanner />
{@render children()}
