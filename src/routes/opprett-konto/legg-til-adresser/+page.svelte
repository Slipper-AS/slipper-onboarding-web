<script>
	import { ArrowRight, Info } from '@lucide/svelte/icons';
</script>

<div class="row-start-2 m-10 flex flex-col space-y-6 pb-20 text-left md:mx-0">
	<img src="/Electric-house.png" alt="House" class="h-[121px] w-[144px] self-center" />
	<h1 class="text-3xl">Legg til dine adresser</h1>
	<p>
		Logg inn med BankID, så henter vi adressene dine og strømdata fra Elhub – Statnetts dataportal
		for strøm.
	</p>
	<div class="flex items-center space-x-2">
		<Info class="text-secondary-500" />
		<p>
			Velg alternativet «<span class="font-bold">
				Strømforbruk og informasjon om strømleverandør</span
			>»
		</p>
	</div>
	<button
		class="bg-secondary-500 flex w-full items-center justify-between rounded-full px-4 py-3 text-black"
	>
		<span class="flex-1 text-lg"> Hent min strømdata</span>
		<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
	</button>
</div>
