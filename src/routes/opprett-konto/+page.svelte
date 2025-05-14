<script>
	import { ArrowRight } from '@lucide/svelte/icons';
</script>

<div class="row-start-3 m-10 flex flex-col space-y-6 text-left md:mx-0">
	<h1 class="text-3xl">Lag en konto og kom i gang</h1>
	<p>Se hvilken strømavtale som er billigst for deg, og hvor mye du kan spare.</p>
	<button
		class="bg-warning-500 flex w-full items-center justify-between rounded-full px-4 py-3 text-white"
	>
		<span class="flex-1 text-lg"> Logg inn med Vipps</span>
		<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
	</button>
	<a href="/sms-login" class="self-center text-gray-300 underline">Har du ikke Vipps?</a>
</div>

<div class="row-start-6 mx-10 mb-10 flex flex-col justify-end md:mx-0">
	<div>
		Ved å fortsette godtar du Slipper sine <a
			class="underline"
			href="https://slipper.no/app-vilkar/"
			target="_blank"
			rel="noopener noreferrer">vilkår</a
		>
		og
		<a
			href="https://slipper.no/personvern/"
			target="_blank"
			rel="noopener noreferrer"
			class="underline">personvernerklæring</a
		>
	</div>
</div>
