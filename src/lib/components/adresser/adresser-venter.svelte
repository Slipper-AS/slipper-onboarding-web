<script>
	import Lottie from '../Lottie.svelte';
	import waitingUFO from '$lib/animations/waitingUfo.json';
</script>

<Lottie classname="size-75" animationData={waitingUFO} loop={true} autoplay={true} />
<div class="text-center">
	<h1 class="text-3xl">Venter på svar fra Elhub</h1>
	<p>Dette kan ta opp til 20 sekunder.</p>
</div>
