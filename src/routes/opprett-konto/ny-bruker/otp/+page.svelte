<script lang="ts">
	import { ArrowRight } from '@lucide/svelte/icons';
	import { PinInput } from 'melt/builders';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const pinInput = new PinInput({
		maxLength: 6,
		type: 'numeric',
		placeholder: '',
	});

	const { data } = $props<{
		data: {
			phone: string;
		};
	}>();

	let error = $state(false);
</script>

<div class="row-start-2 m-12 flex w-min flex-col space-y-6 text-left md:mx-0">
	<h1 class="text-3xl">Tast inn koden sendt til <br />+47 {data.phone}</h1>

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					error = false;
					goto('/opprett-konto/ny-bruker/personalia');
				} else if (result.type === 'error') {
					error = true;
				}
			};
		}}
		class="flex flex-col space-y-4"
	>
		<div class="mb-7 flex items-center justify-center gap-2" {...pinInput.root}>
			{#each pinInput.inputs as input}
				<input
					name="otp[]"
					class="focus:border-accent-500 h-20 w-14 rounded-xl border-2 bg-white text-center
				transition outline-none hover:border-gray-400 disabled:cursor-not-allowed
				 dark:hover:border-gray-400 dark:focus:border-gray-300"
					class:border-error-500={error}
					class:dark:border-error-500={error}
					class:border-gray-500={!error}
					class:dark:border-gray-500={!error}
					{...input}
				/>
			{/each}
		</div>

		{#if error}
			<p class="text-error-500 -mt-1 mb-4 text-base">
				Feil kode. Kontroller at du har tastet inn riktig kode og prøv på nytt.
			</p>
		{/if}

		<button
			class="form-next-button"
			type="submit"
			disabled={pinInput.value.length !== pinInput.maxLength}
		>
			<span class="flex-1 text-lg"> Bekreft </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>
