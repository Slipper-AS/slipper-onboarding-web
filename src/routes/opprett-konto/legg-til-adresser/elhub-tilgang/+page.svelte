<script>
	import BackButton from '$lib/components/BackButton.svelte';
	import { ArrowRight, TriangleAlert } from '@lucide/svelte/icons';
</script>

<svelte:head>
	<link rel="preload" href="/access_type_arrow.png" as="image" />
</svelte:head>

<BackButton />
<div
	class="row-start-2 mx-10 flex flex-col space-y-6 pb-20 text-left sm:row-start-2 sm:-mt-10 md:mx-0"
>
	<div class="flex items-center space-x-2">
		<TriangleAlert class="size-8 shrink-0" />
		<h1 class="text-3xl">Velg riktig tilgang</h1>
	</div>
	<p>
		Når du er hos Elhub, <span class="font-bold">velg nederste alternativ for tilgang</span> – det
		er nødvendig for at appen skal fungere.
	</p>
	<img
		src="/access_type_arrow.png"
		alt="Velg Måleverdier, kontrakt og utvidet målepunkt- og kundeinformasjon"
		class="self-center rounded-lg"
	/>
	<form method="POST">
		<button
			class="bg-secondary-500 hover:bg-secondary-600 relative flex w-full items-center justify-center rounded-full px-4 py-3 text-black"
			type="submit"
		>
			<span class="text-lg">Gå til Elhub</span>
			<ArrowRight class="absolute right-4 size-7" />
		</button>
	</form>
</div>
