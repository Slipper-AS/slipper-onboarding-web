<script>
    import { goto } from '$app/navigation';
	import ReferalPill from '$lib/components/opprett-konto/ReferalPill.svelte';
    import { ArrowRight } from '@lucide/svelte/icons';

</script>




<div class="flex flex-col row-start-2 space-y-6 m-10 md:mx-0 text-left">
    <h1 class="text-3xl ">Lag en konto og kom i gang</h1>
    <p>Se hvilken strømavtale som er billigst for deg, og hvor mye du kan spare.</p>
    <button class="flex items-center justify-between px-4 py-3 bg-warning-500 rounded-full w-full text-white">
        <span class="flex-1 text-lg"> Logg inn med Vipps</span>
        <span class="ml-auto"> <ArrowRight class="size-7" /> </span>
    </button>
    <a href="/sms-login" class="text-gray-300 underline self-center">Har du ikke Vipps?</a>
</div>

<div class="flex flex-col justify-end mb-10 mx-10 md:mx-0">
    <div> Ved å fortsette godtar du Slipper sine <a class="underline" href="https://slipper.no/app-vilkar/" target="_blank" rel="noopener noreferrer">vilkår</a> og <a href="https://slipper.no/personvern/" target="_blank" rel="noopener noreferrer" class="underline">personvernerklæring</a> </div>
</div>

