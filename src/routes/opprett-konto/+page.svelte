<script>
	import {
		PUBLIC_REDIRECT_PERSONVERN_URL,
		PUBLIC_REDIRECT_VILKAAR_URL,
		PUBLIC_REDIRECT_VIPPS_URL,
	} from '$env/static/public';
	import { ArrowRight } from '@lucide/svelte/icons';
</script>

<div class="row-start-2 mx-10 flex flex-col space-y-6 text-left sm:row-start-2 md:mx-0">
	<img src="/Happy-selfie-man.png" alt="Happy Selfie Man" class="h-[124px] w-[200px] self-center" />
	<h1 class="text-3xl">Lag en konto og kom i gang</h1>
	<p>Se hvilken strømavtale som er billigst for deg, og hvor mye du kan spare.</p>
	<button
		onclick={() => {
			window.location.href = PUBLIC_REDIRECT_VIPPS_URL;
		}}
		class="bg-warning-500 hover:bg-warning-600 flex w-full items-center justify-between rounded-full px-4 py-3 text-white transition duration-200"
	>
		<span class="flex-1 text-lg"> Logg inn med Vipps</span>
		<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
	</button>
	<a href="opprett-konto/ny-bruker/telefonnummer" class="self-center text-gray-300 underline"
		>Har du ikke Vipps?</a
	>
</div>

<div class="row-start-6 mx-10 mb-10 flex flex-col justify-end md:mx-0">
	<div>
		Ved å fortsette godtar du Slipper sine <a
			class="underline"
			href={PUBLIC_REDIRECT_VILKAAR_URL}
			target="_blank"
			rel="noopener noreferrer">vilkår</a
		>
		og
		<a
			href={PUBLIC_REDIRECT_PERSONVERN_URL}
			target="_blank"
			rel="noopener noreferrer"
			class="underline">personvernerklæring</a
		>
	</div>
</div>
