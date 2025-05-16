<script lang="ts">
	import { ArrowRight } from '@lucide/svelte/icons';
	import { PinInput } from 'melt/builders';

	const pinInput = new PinInput({
		maxLength: 6,
		type: 'numeric',
		placeholder: '',
	});
</script>

<div class="row-start-2 m-12 flex flex-col space-y-6 text-left md:mx-0">
	<h1 class="text-3xl">Tast inn koden sendt til <br /> +47 4004887</h1>

	<form class="flex flex-col space-y-4">
		<div class="mb-7 flex items-center justify-center gap-2" {...pinInput.root}>
			{#each pinInput.inputs as input}
				<input
					class="focus:border-accent-500 h-20 w-14 rounded-xl border-2 border-gray-300 bg-white text-center
				transition outline-none hover:border-gray-400 disabled:cursor-not-allowed
				dark:border-gray-400/50 dark:bg-gray-900 dark:hover:border-gray-400 dark:focus:border-gray-300"
					{...input}
				/>
			{/each}
		</div>

		<button
			class="flex w-full items-center justify-between rounded-full bg-[#58585C] px-4 py-3 text-white"
		>
			<span class="flex-1 text-lg"> Bekreft </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>
