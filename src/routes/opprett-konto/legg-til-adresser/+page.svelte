<script>
    import { ArrowRight, Info } from '@lucide/svelte/icons';
</script>


<div class="flex flex-col row-start-2 space-y-6 m-10 md:mx-0 text-left pb-20">
    <img src="/Electric-house.png" alt="House" class="w-[144px] h-[121px] self-center" />
    <h1 class="text-3xl ">Legg til dine adresser</h1>
    <p>Logg inn med BankID, så henter vi adressene dine og strømdata fra Elhub – Statnetts dataportal for strøm.</p>
    <div class="flex items-center space-x-2">
        <Info class="text-secondary-500" />
        <p>Velg alternativet «<span class="font-bold"> Strømforbruk og informasjon om strømleverandør</span>»</p>   
    </div>
    <button class="flex items-center justify-between px-4 py-3 bg-secondary-500 rounded-full w-full text-white">
        <span class="flex-1 text-lg"> Hent min strømdata</span>
        <span class="ml-auto"> <ArrowRight class="size-7" /> </span>
    </button>
</div>
<div class="row-start-3"></div>

