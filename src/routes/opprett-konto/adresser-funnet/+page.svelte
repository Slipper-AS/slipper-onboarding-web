<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowRight, Home } from '@lucide/svelte/icons';
	// Dummy data for addresses
	const adresses = [
		{
			id: 1,
			address: 'Storgata 1, 1234 Oslo',
		},
		{
			id: 2,
			address: 'Bergveien 2, 5678 Bergen',
		},
		{
			id: 3,
			address: 'Hovedgata 3, 9101 Trondheim',
		},
	];
</script>

<div class="row-start-2 m-10 flex flex-col space-y-6 text-left md:mx-0">
	<img src="/Happy-selfie-man.png" alt="Happy Selfie Man" class="h-[121px] w-[144px] self-center" />
	<h1 class="text-3xl">Bingo! Vi fant følgende adresser:</h1>
	<ul>
		{#each adresses as address}
			<li class="mb-4">
				<div class="flex items-center space-x-4">
					<Home class="text-secondary-500" />
					<p class="text-lg">{address.address}</p>
				</div>
			</li>
		{/each}
	</ul>
	<button
		onclick={() => goto('last-ned-app')}
		class="bg-secondary-500 hover:bg-secondary-600 flex w-full items-center justify-between rounded-full px-4 py-3 text-black"
	>
		<span class="flex-1 text-lg"> Fortsett </span>
		<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
	</button>
</div>
