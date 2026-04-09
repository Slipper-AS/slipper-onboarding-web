<script>
	import BackButton from '$lib/components/BackButton.svelte';
	import { ArrowRight } from '@lucide/svelte/icons';
</script>

<svelte:head>
	<link rel="preload" href="/Electric-house.png" as="image" />
	<link rel="preload" href="/access_type_arrow.png" as="image" />
</svelte:head>

<BackButton />
<div
	class="row-start-2 mx-10 flex flex-col space-y-6 pb-20 text-left sm:row-start-2 sm:-mt-10 md:mx-0"
>
	<img src="/Electric-house.png" alt="House" class="size-60 self-center" />
	<h1 class="text-3xl">Koble til hjemmene dine</h1>
	<p>Logg inn med BankID hos Elhub for å koble til strømdata fra hjemmene dine.</p>
	<a
		href="/opprett-konto/legg-til-adresser/elhub-tilgang"
		class="bg-secondary-500 hover:bg-secondary-600 relative flex w-full items-center justify-center rounded-full px-4 py-3 text-black"
	>
		<span class="text-lg">Fortsett</span>
		<ArrowRight class="absolute right-4 size-7" />
	</a>
</div>
