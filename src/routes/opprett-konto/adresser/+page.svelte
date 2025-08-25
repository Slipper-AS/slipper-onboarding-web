<script lang="ts">
	import AdresserFunnet from '$lib/components/adresser/adresser-funnet.svelte';
	import AdresserTimeout from '$lib/components/adresser/adresser-timeout.svelte';
	import AdresserVenter from '$lib/components/adresser/adresser-venter.svelte';
	import { onMount } from 'svelte';
	import { track } from '$lib/services/analytics';

	let status: 'fetching' | 'success' | 'timeout' = $state('fetching');
	let data = $state([]);
	let longList = $derived.by(() => {
		if (data && data.length >= 3) {
			return true;
		} else {
			return false;
		}
	});

	onMount(async () => {
		try {
			const res = await fetch('/opprett-konto/adresser');
			const json = await res.json();
			if (json.status === 'success') {
				data = json.data;
				status = 'success';
			} else {
				status = 'timeout';
			}
		} catch (err) {
			status = 'timeout';
		}
		
		// Track analytics using the service
		await track('Onboarding Completed - At Adresse Page', {
			page: 'Adresse',
			status: status,
		});
	});
</script>

<div
	class="row-span-full mx-10 -mt-40 flex flex-col justify-center space-y-6 text-left sm:mt-0 sm:justify-normal md:mx-0"
	class:row-start-3={longList}
	class:row-start-2={!longList}
>
	{#if status === 'fetching'}
		<AdresserVenter />
	{:else if status === 'timeout'}
		<AdresserTimeout />
	{:else if status === 'success'}
		<AdresserFunnet data={data} smallText={longList} />
	{/if}
</div>
