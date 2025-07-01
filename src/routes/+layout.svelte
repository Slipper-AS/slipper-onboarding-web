<script lang="ts">
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	import { env } from '$env/dynamic/private';

	let { children } = $props();
	let rudderanalytics;

	onMount(async () => {
		// Send pageview on initial load
		gtag('event', 'page_view', { page_path: location.pathname });

		// Initialize RudderStack
		const module = await import('rudder-sdk-js');
		rudderanalytics = module;
		if (env.PUBLIC_WRITE_KEY_RUDDERSTACK && env.PUBLIC_DATA_PLANE_URI_RUDDERSTACK) {
			rudderanalytics.load(env.PUBLIC_WRITE_KEY_RUDDERSTACK, env.PUBLIC_DATA_PLANE_URI_RUDDERSTACK);
			rudderanalytics.page('Onboarding Loaded'); // Track initial page view
		} else {
			console.warn('RudderStack write key is not defined');
		}
	});

	afterNavigate(() => {
		gtag('event', 'page_view', { page_path: location.pathname });
	});
</script>

<CookieBanner />
{@render children()}
