<script>
	import { goto } from '$app/navigation';
	import { ArrowRight } from '@lucide/svelte/icons';
</script>

<svelte:head>
	<link rel="preload" href="/three_screens.png" as="image" />
	<link rel="preload" href="/Slipper-app-qr-code.png" as="image" />
</svelte:head>

<img src="/Vi-forhandler.png" alt="Vi Forhandler" class="size-45 self-center sm:size-60" />
<h1 class="text-3xl">Elhub bruker lang tid</h1>
<p>
	Elhub bruker litt lengre tid enn normalt å sende oss adressene dine, men du kan begynne å bruke
	appen mens vi tar oss av saken!
</p>

<button
	onclick={() => goto('last-ned-app')}
	class="bg-secondary-500 hover:bg-secondary-600 relative flex w-full items-center justify-center rounded-full px-4 py-3 text-black"
>
	<span class="text-lg"> Fortsett </span>
	<span class="absolute right-4"> <ArrowRight class="size-7" /> </span>
</button>
