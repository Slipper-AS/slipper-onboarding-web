<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowRight, Home } from '@lucide/svelte/icons';

	let props = $props();
</script>

<img src="/Happy-dancing-man.png" alt="Happy Dancing Man" class="size-60 self-center" />
<h1 class="text-3xl">Bingo! Vi fant følgende adresser:</h1>
<ul>
	{#each props.data as address}
		<li class="mb-4">
			<div class="flex items-center space-x-4">
				<Home class="text-secondary-500" />
				<p class="text-lg">
					{address.street}
					{address.streetNumber}, {address.postalCode}
					{address.city}
				</p>
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
