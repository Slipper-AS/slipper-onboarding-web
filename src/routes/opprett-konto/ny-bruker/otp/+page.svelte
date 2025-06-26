<script lang="ts">
	import { ArrowRight } from '@lucide/svelte/icons';
	import { PinInput } from 'melt/builders';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import BackButton from '$lib/components/BackButton.svelte';

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

<BackButton />
<div
	class="row-span-full row-start-2 mx-8 -mt-30 flex flex-col items-center justify-center space-y-6 text-left sm:mt-0 sm:justify-normal md:mx-0"
>
	<h1 class="self-start text-3xl">Tast inn koden sendt til <br />+47 {data.phone}</h1>

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				console.log('OTP result', result);
				if (result.type === 'success') {
					error = false;
					goto('/opprett-konto/ny-bruker/personalia');
				} else if (result.type === 'failure') {
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
					class="focus:border-accent-500 pin-input-width h-20 w-14 rounded-xl border-2 bg-white px-0! text-center
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

<style>
	@media (max-width: 410px) {
		.pin-input-width {
			width: 2.8rem;
		}
	}
</style>
