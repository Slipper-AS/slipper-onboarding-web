<script lang="ts">
    import {ArrowRight, Zap, HandCoins, FileSearch, TrendingUpDown} from '@lucide/svelte/icons';
    import { goto } from '$app/navigation';
</script>

<main>
    <div class="flex flex-col items-center lg:mt-10 lg:space-y-15">
        <section class="section grid grid-cols-1 gap-5 items-center lg:w-4xl">
            <div class="flex col-start-1 lg:row-start-1 justify-center lg:justify-start">
                <img src="Slipper-logo.png" alt="Slipper Logo" class="w-[10rem]" />
            </div>
            <div class="space-y-5 col-start-1 flex flex-col lg:w-lg xl:w-xl">
                <h1 class="h1 text-3xl text-left">
                    <span class="text-warning-500">Jon</span> har invitert deg til Slipper
                </h1>
                <p class="text-left text-lg">Slipper er Norges første uavhengige strømbytte-app - laget av forbrukere, for forbrukere. Last ned i dag og få se hvor mye du kan spare på å bytte til billigste strømavtale for deg.</p>
                <button onclick={() => goto('opprett-konto')} class="bg-secondary-500 hover:bg-secondary-600 flex justify-between items-center text-center rounded-full lg:w-sm lg-14 cursor-pointer py-3 px-5 mt-6">
                    <span class="flex-1 text-lg text-black">Kom i gang</span>
                    <span class="ml-auto text-black"> <ArrowRight class="size-7" /> </span>
                </button>
            </div>
            <div class="row-start-2 row-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 flex justify-center lg:justify-end mt-5 lg:mt-0">
                <img src="iPhone.png" alt="iPhone" class="w-52 h-76" />
            </div>
        </section>


        <section class="section flex flex-col space-y-10 items-center justify-center bg-primary-500 base-font-color w-full ">
            <div class="space-y-5 flex flex-col items-center ">
                <h1 class="h1 text-3xl base-font-color">Appen som sørger for at du <br> alltid har den billigste strømavtalen</h1>
                <div class="w-none lg:max-w-3xl">
                    <p class="text-lg base-font-color ">
                        Vi sjekker markedet hvert 15. minutt og finner avtalen som passer best for deg og din adresse. Du får samtidig full oversikt over priser, forbruk og alt som har med strøm å gjøre – samlet i én app.
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-10">
                <div class="flex flex-col items-center max-w-[190px] space-y-2">
                    <HandCoins/>
                    <h5 class="h5 base-font-color">Spar penger</h5>
                    <p class="text-md">Bytt enkelt til en billigere strømavtale</p>
                </div>
                <div class="flex flex-col items-center max-w-[190px] space-y-2">
                    <FileSearch/>
                    <h5 class="h5 base-font-color">Full Oversikt</h5>
                    <p class="text-md">Følg med på strømpriser og strømforbruk</p>
                </div>
                <div class="flex flex-col items-center max-w-[190px] space-y-2">
                    <Zap/>
                    <h5 class="h5 base-font-color">Bruk strøm smart</h5>
                    <p class="text-md">Bruk strømmen når den koster minst</p>
                </div>
                <div class="flex flex-col items-center max-w-[190px] space-y-2">
                    <TrendingUpDown/>
                    <h5 class="h5 base-font-color">Planlegg frem i tid</h5>
                    <p class="text-md">Se strømprisprognoser <br> 7 dager frem</p>
                </div>
            </div>
        </section>

        <section class="section grid grid-cols-1 gap-5 mb-12 items-center lg:w-4xl">
            <div class="flex justify-center">
                <img src="Paa-lag.png" alt="Paa Lag" class="max-w-[100px]" />
            </div>
            <div  class="w-none lg:max-w-3xl flex flex-col col-start-1 justify-center">
                <h1 class="h1 text-3xl">Bli med å snu opp ned på strømbransjen <span class="inline-flex"><Zap color="orange" fill="yellow" strokeWidth=1/></span></h1>
                <p class="mt-3 text-lg "> I Slipper bestemmer du! Foreslå funksjoner, stem på idéer og vær med å bygge appen strømselskapene håper du aldri får høre om...</p>
            </div>
        <div class=" flex flex-col lg:items-center">
                <button  onclick={() => goto('opprett-konto')} class="bg-secondary-500 hover:bg-secondary-600 flex justify-between items-center text-center rounded-full lg:w-sm lg-14 cursor-pointer py-3 px-5 mt-6" >
                    <span class="flex-1 text-lg text-black">Kom i gang</span>
                    <span class="ml-auto text-black"> <ArrowRight/> </span>
                </button>
            </div>
        </section>
    </div>
</main>
    

<style>
    .section {
        padding: 2rem;
        text-align: center;
        flex: 1; 
    }
</style>

