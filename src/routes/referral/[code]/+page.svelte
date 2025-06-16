<script lang="ts">
	import { ArrowRight, Zap, HandCoins, FileSearch, TrendingUpDown } from '@lucide/svelte/icons';
	import { goto } from '$app/navigation';

	const { data } = $props<{
		data: {
			referrerShortName: string;
		};
	}>();
</script>

<main>
	<div class="flex flex-col items-center lg:mt-10 lg:space-y-15">
		<section class="section grid grid-cols-1 items-center gap-5 lg:w-4xl">
			<div class="col-start-1 flex justify-center lg:row-start-1 lg:justify-start">
				<img src="/Slipper-logo.png" alt="Slipper Logo" class="w-[8rem]" />
			</div>
			<div class="col-start-1 flex flex-col space-y-5 lg:w-lg xl:w-xl">
				<h1 class="h1 text-left text-3xl">
					<span class="text-warning-500">{data.referrerShortName}</span> har invitert deg til Slipper
				</h1>
				<p class="text-left text-lg">
					Slipper er Norges første uavhengige strømbytte-app - laget av forbrukere, for forbrukere.
					Last ned i dag og få se hvor mye du kan spare på å bytte til billigste strømavtale for
					deg.
				</p>
				<button
					onclick={() => goto('/opprett-konto/')}
					class="bg-secondary-500 hover:bg-secondary-600 lg-14 mt-6 flex cursor-pointer items-center justify-between rounded-full px-5 py-3 text-center lg:w-sm"
				>
					<span class="flex-1 text-lg text-black">Kom i gang</span>
					<span class="ml-auto text-black"> <ArrowRight class="size-7" /> </span>
				</button>
			</div>
			<div
				class="row-span-1 row-start-2 mt-5 flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:justify-end"
			>
				<img src="/iPhone.png" alt="iPhone" class="h-76 w-52" />
			</div>
		</section>

		<section
			class="section bg-surface-500 base-font-color flex w-full flex-col items-center justify-center space-y-10"
		>
			<div class="flex flex-col items-center space-y-5">
				<h1 class="h1 base-font-color text-2xl">
					Appen som sørger for at du alltid har den billigste strømavtalen
				</h1>
				<div class="w-none lg:max-w-3xl">
					<p class="base-font-color text-lg">
						Vi sjekker markedet hvert 15. minutt og finner avtalen som passer best for deg og din
						adresse. Du får samtidig full oversikt over priser, forbruk og alt som har med strøm å
						gjøre – samlet i én app.
					</p>
				</div>
			</div>
			<div class="grid grid-cols-2 grid-rows-2 gap-10 md:grid-cols-4 md:grid-rows-1">
				<div class="flex max-w-[190px] flex-col items-center space-y-2">
					<HandCoins />
					<h5 class="h5 base-font-color">Spar penger</h5>
					<p class="text-md">Bytt enkelt til en billigere strømavtale</p>
				</div>
				<div class="flex max-w-[190px] flex-col items-center space-y-2">
					<FileSearch />
					<h5 class="h5 base-font-color">Full oversikt</h5>
					<p class="text-md">Følg med på strømpriser og strømforbruk</p>
				</div>
				<div class="flex max-w-[190px] flex-col items-center space-y-2">
					<Zap />
					<h5 class="h5 base-font-color">Bruk strøm smart</h5>
					<p class="text-md">Bruk strømmen når den koster minst</p>
				</div>
				<div class="flex max-w-[190px] flex-col items-center space-y-2">
					<TrendingUpDown />
					<h5 class="h5 base-font-color">Planlegg frem i tid</h5>
					<p class="text-md">Se strømprisprognoser <br /> 7 dager frem</p>
				</div>
			</div>
		</section>

		<section class="section mb-12 grid grid-cols-1 items-center gap-5 lg:w-4xl">
			<div class="flex justify-center">
				<img src="/Paa-lag.png" alt="Paa Lag" class="max-w-[100px]" />
			</div>
			<div class="w-none col-start-1 flex flex-col justify-center lg:max-w-3xl">
				<h1 class="h1 text-2xl">
					Bli med å snu opp ned på strømbransjen <span class="inline-flex"
						><Zap color="orange" fill="yellow" strokeWidth="1" /></span
					>
				</h1>
				<p class="mt-3 text-lg">
					I Slipper bestemmer du! Foreslå funksjoner, stem på idéer og vær med å bygge appen
					strømselskapene håper du aldri får høre om...
				</p>
			</div>
			<div class=" flex flex-col lg:items-center">
				<button
					onclick={() => goto('/opprett-konto/')}
					class="bg-secondary-500 hover:bg-secondary-600 lg-14 mt-6 flex cursor-pointer items-center justify-between rounded-full px-5 py-3 text-center lg:w-sm"
				>
					<span class="flex-1 text-lg text-black">Kom i gang</span>
					<span class="ml-auto text-black"> <ArrowRight /> </span>
				</button>
			</div>
		</section>
	</div>
</main>

<style>
	.section {
		padding: 6rem 2rem;
		text-align: center;
		flex: 1;
	}
</style>
