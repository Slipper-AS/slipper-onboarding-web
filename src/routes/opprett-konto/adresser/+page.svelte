<script lang="ts">
	import AdresserFunnet from '$lib/components/adresser/adresser-funnet.svelte';
	import AdresserTimeout from '$lib/components/adresser/adresser-timeout.svelte';
	import AdresserVenter from '$lib/components/adresser/adresser-venter.svelte';
	import { onMount } from 'svelte';

	let status: 'fetching' | 'success' | 'timeout' = $state('fetching');
	let data = $state();

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
	});
</script>

<div class="row-start-2 mx-10 flex flex-col space-y-6 text-left sm:row-start-2 md:mx-0">
	{#if status === 'fetching'}
		<AdresserVenter />
	{:else if status === 'timeout'}
		<AdresserTimeout />
	{:else if status === 'success'}
		<AdresserFunnet data={data} />
	{/if}
</div>
