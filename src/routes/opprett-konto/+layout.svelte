<script>
	import ReferalPill from '$lib/components/opprett-konto/ReferalPill.svelte';

     let { children } = $props();
</script>

<main class="max-h-screen h-screen">
    <div class="h-full flex flex-col items-center">
    <div class="grid grid-rows-3 h-full max-w-md ">
        <div class="flex flex-col items-center row-start-1 mt-10 mx-10 md:mx-0">
            <ReferalPill name="Shahrukh" />
        </div>

    {@render children()}
    </div>
</main>