<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Undo2 } from '@lucide/svelte/icons';

	import cableAnimation from '$lib/animations/400error.json';
	import ufoAnimation from '$lib/animations/500error.json';
	import Lottie from '$lib/components/Lottie.svelte';
	import '../app.css';
</script>

<main class="h-screen max-h-screen">
	<div class="flex h-full flex-row items-center justify-center space-x-15">
		<div>
			<h1 class="h1 text-warning-500 text-left text-7xl">{page.status}</h1>
			<div class="sm:w-xs">
				{#if page.status === 404}
					<p>Oops... denne siden eksisterer ikke</p>
				{:else if page.status === 500}
					<p>Noe gikk galt. Prøv å oppdater siden, eller kontakt oss om feilen vedvarer.</p>
				{:else}
					<p>
						{page.error?.message || 'En uforventet feil har oppstått, vennligst prøv igjen senere.'}
					</p>
				{/if}
			</div>

			<button
				onclick={() => goto('/')}
				class="bg-secondary-500 hover:bg-secondary-600 mt-4 flex w-2xs cursor-pointer items-center justify-between rounded-full px-5 py-3 text-center sm:w-2xs"
			>
				<span class="text-md flex-1 font-normal text-black">Tilbake til forsiden</span>
				<span class="ml-auto text-black"> <Undo2 strokeWidth="2" /> </span>
			</button>
		</div>
		<div class="size-75">
			{#if page.status === 404}
				<Lottie animationData={cableAnimation} loop={true} autoplay={true} />
			{:else if page.status === 500}
				<Lottie animationData={ufoAnimation} loop={true} autoplay={true} />
			{/if}
		</div>
	</div>
</main>
