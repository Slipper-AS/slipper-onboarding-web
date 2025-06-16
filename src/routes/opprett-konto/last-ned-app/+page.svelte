<script lang="ts">
	import {
		PUBLIC_REDIRECT_SLIPPER_APPSTORE_URL,
		PUBLIC_REDIRECT_SLIPPER_PLAYSTORE_URL,
	} from '$env/static/public';
	import { ArrowRight, Zap, HandCoins, TrendingUpDown, Users } from '@lucide/svelte/icons';

	const slipperInfo = [
		{
			id: 1,
			icon: Zap,
			title: 'Spar penger',
			description: 'Bytt til en billigere strømavtale enkelt',
		},
		{
			id: 2,
			icon: HandCoins,
			title: 'Spar strøm',
			description: 'Bruk strømmen når den koster minst',
		},
		{
			id: 3,
			icon: TrendingUpDown,
			title: 'Sjekk dine abonnementer',
			description: 'Se spotprisprognose 7 dager frem i tid',
		},
		{
			id: 4,
			icon: Users,
			title: 'Sjekk dine abonnementer',
			description: 'Vær med og bestem hva vi bygger i appen',
		},
	];
	const userAgent = $state(navigator.userAgent);
	const isAndroid = $state(/android/i.test(userAgent));
	const isIOS = $state(/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window));

	function handleDownload() {
		if (isAndroid) {
			window.location.href = PUBLIC_REDIRECT_SLIPPER_PLAYSTORE_URL;
		} else if (isIOS) {
			window.location.href = PUBLIC_REDIRECT_SLIPPER_APPSTORE_URL;
		}
	}
</script>

<div class="row-start-3 mx-10 -mt-25 flex flex-col space-y-6 text-left sm:row-start-2 md:mx-0">
	{#if isAndroid || isIOS}
		<img src="/Last-ned-app.png" alt="iPhones" class="size-60 self-center" />
	{:else}
		<div class="flex flex-col items-center space-y-0">
			<img src="/Slipper-app-qr-code.png" alt="QR Code" class="size-60 self-center" />
			<h2 class="text-center text-xl">Scan med mobilen</h2>
		</div>
	{/if}
	<h1 class="text-3xl">Last ned appen og ta smartere strømvalg</h1>
	<ul>
		{#each slipperInfo as infoPoint}
			{@const Icon = infoPoint.icon}
			<li class="mb-4">
				<div class="flex items-center space-x-4">
					<Icon class="text-secondary-500 size-6" />
					<p class="text-base">{infoPoint.description}</p>
				</div>
			</li>
		{/each}
	</ul>
	{#if isAndroid || isIOS}
		<button
			class="bg-secondary-500 hover:bg-secondary-600 flex w-full items-center justify-between rounded-full px-4 py-3 text-black"
			onclick={handleDownload}
		>
			<span class="flex-1 text-lg"> Last ned appen </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	{/if}
</div>
