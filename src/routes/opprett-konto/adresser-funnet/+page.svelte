<script>
    import { ArrowRight, Home } from '@lucide/svelte/icons';
    // Dummy data for addresses
    const adresses = [
        {
            id: 1,
            address: 'Storgata 1, 1234 Oslo',
        },
        {
            id: 2,
            address: 'Bergveien 2, 5678 Bergen',
        },
        {
            id: 3,
            address: 'Hovedgata 3, 9101 Trondheim',
        },
    ];
</script>


<div class="flex flex-col row-start-2 space-y-6 m-10 md:mx-0 text-left pb-20">
    <img src="/Happy-selfie-man.png" alt="Happy Selfie Man" class="w-[144px] h-[121px] self-center" />
    <h1 class="text-3xl ">Bingo! Vi fant følgende adresser:</h1>
    <ul>
        {#each adresses as address}
        <li class="mb-4">
            <div class ="flex items-center space-x-4">
                <Home class="text-secondary-500"/>
                <p class="text-lg">{address.address}</p>
            </div>
        </li>
        {/each}
    </ul>
    <button class="flex items-center justify-between px-4 py-3 bg-secondary-500 rounded-full w-full text-white">
        <span class="flex-1 text-lg"> Fortsett </span>
        <span class="ml-auto"> <ArrowRight class="size-7" /> </span>
    </button>
</div>
<div class="row-start-3"></div>
