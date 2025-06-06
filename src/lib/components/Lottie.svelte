<script lang="ts">
	import lottie, { type AnimationItem } from 'lottie-web';

	const {
		src = null,
		animationData = null,
		loop = true,
		autoplay = true,
		classname = null,
	} = $props<{
		src?: string | null;
		animationData?: object | null;
		loop?: boolean;
		autoplay?: boolean;
		classname?: string | null;
	}>();

	let container: HTMLDivElement | undefined = $state();
	let animation: AnimationItem | undefined = $state();

	$effect(() => {
		if (!animation && container) {
			animation = lottie.loadAnimation({
				container,
				path: src ?? undefined,
				animationData: animationData ?? undefined,
				renderer: 'svg',
				loop,
				autoplay,
			});
		}
	});
</script>

<div class={classname} class:animate-fade-in-once={animation?.isLoaded} bind:this={container}></div>
