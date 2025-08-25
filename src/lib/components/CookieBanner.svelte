<script lang="ts">
	import { onMount } from 'svelte';
	import { page, reinitializeOnConsent } from '$lib/services/analytics';
	let visible = false;

	onMount(() => {
		const consent = localStorage.getItem('cookie_consent');
		if (!consent) visible = true;
	});

	async function acceptCookies() {
		localStorage.setItem('cookie_consent', 'granted');

		window.gtag('event', 'consent', {
			ad_storage: 'granted',
			analytics_storage: 'granted',
		});

		// Reinitialize analytics service with consent granted
		await reinitializeOnConsent();
		
		// Track page view using analytics service
		await page('Onboarding Loaded');

		visible = false;
	}

	function rejectCookies() {
		localStorage.setItem('cookie_consent', 'denied');

		window.gtag('event', 'consent', {
			ad_storage: 'denied',
			analytics_storage: 'denied',
		});

		visible = false;
	}
</script>

{#if visible}
	<div
		class="bg-surface-500 fixed bottom-0 z-50 flex w-full flex-col items-center gap-2 p-4 text-sm shadow-lg"
	>
		<p class="text-center text-black">
			Vi bruker informasjonskapsler for å analysere trafikk. Du kan velge om du vil tillate dette.
		</p>
		<div class="flex gap-4">
			<button on:click={acceptCookies} class="bg-secondary-500 rounded px-4 py-1 text-black"
				>Aksepter</button
			>
			<button on:click={rejectCookies} class="rounded bg-gray-300 px-4 py-1 text-black"
				>Avslå</button
			>
		</div>
	</div>
{/if}
