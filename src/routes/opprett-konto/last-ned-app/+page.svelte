<script lang="ts">
	import {
		PUBLIC_REDIRECT_SLIPPER_APPSTORE_URL,
		PUBLIC_REDIRECT_SLIPPER_PLAYSTORE_URL,
	} from '$env/static/public';
	import { page } from '$app/state';
	import { ArrowRight, Zap, HandCoins, FileSearch, PiggyBank } from '@lucide/svelte/icons';

	const slipperInfo = [
		{
			id: 1,
			icon: HandCoins,
			title: 'Billigste strømavtale',
			description: 'Finn billigste avtale for deg, og bytt hver gang det lønner seg',
		},
		{
			id: 2,
			icon: FileSearch,
			title: 'Full oversikt',
			description: 'Innsikt i forbruk, priser, nettleie, norgespris og mer',
		},
		{
			id: 3,
			icon: Zap,
			title: 'Bruk strøm smart',
			description: 'Ta valg som fører til lavere strømpris og kostnader',
		},
		{
			id: 4,
			icon: PiggyBank,
			title: 'Se hva du sparer',
			description: 'Se sparingen vokse, dag for dag',
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

<div
	class="row-span-full m-10 flex min-h-[calc(100dvh-5rem)] flex-col justify-center space-y-6 text-left md:mx-0 {page
		.data.hasReferrer
		? 'row-start-2'
		: 'row-start-1'}"
>
	{#if isAndroid || isIOS}
		<img
			src="/three_screens.png"
			alt="iPhones"
			class="h-auto w-[clamp(18rem,40dvh,28rem)] max-w-full self-center"
		/>
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
			<li class="mb-6">
				<div class="flex items-center space-x-4">
					<Icon class="text-secondary-500 size-6 shrink-0" />
					<p class="text-base leading-tight">{infoPoint.description}</p>
				</div>
			</li>
		{/each}
	</ul>
	{#if isAndroid || isIOS}
		<button
			class="bg-secondary-500 hover:bg-secondary-600 relative flex w-full items-center justify-center rounded-full px-4 py-3 text-black"
			onclick={handleDownload}
		>
			<span class="text-lg"> Last ned appen </span>
			<span class="absolute right-4"> <ArrowRight class="size-7" /> </span>
		</button>
	{/if}
</div>
