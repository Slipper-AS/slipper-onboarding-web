<script lang="ts">
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

	function handleDownload() {
		const userAgent = navigator.userAgent;

		const isAndroid = /android/i.test(userAgent);
		const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

		if (isAndroid) {
			window.location.href = 'https://play.google.com/store/apps/details?id=no.slipper.app&hl=no';
		} else if (isIOS) {
			window.location.href =
				'https://apps.apple.com/no/app/slipper-power-to-the-people/id6471837168?l=nb';
		} else {
			window.location.href = 'https://qr.slipper.no/r/Lastned';
		}
	}
</script>

<div class="row-start-2 m-10 flex flex-col space-y-6 text-left md:mx-0">
	<img src="/Last-ned-app.png" alt="iPhones" class="h-[272px] w-[240px] self-center" />
	<h1 class="text-3xl">Last ned appen og ta smartere strømvalg</h1>
	<ul>
		{#each slipperInfo as infoPoint}
			<li class="mb-4">
				<div class="flex items-center space-x-4">
					<infoPoint.icon this={infoPoint.icon} class="text-secondary-500 size-6" />
					<p class="text-base">{infoPoint.description}</p>
				</div>
			</li>
		{/each}
	</ul>
	<button
		class="bg-secondary-500 hover:bg-secondary-600 flex w-full items-center justify-between rounded-full px-4 py-3 text-black"
	>
		<span class="flex-1 text-lg"> Last ned appen </span>
		<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
	</button>
</div>
