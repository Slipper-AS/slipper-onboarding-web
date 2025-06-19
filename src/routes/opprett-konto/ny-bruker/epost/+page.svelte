<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { ArrowRight, AtSign, AlertCircle } from '@lucide/svelte/icons';
	import type { PageProps } from './$types.js';

	let email = $state('');
	let emailValid = $derived(email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

	let attemptedSubmit = $state(false);

	let { form }: PageProps = $props();
</script>

<div
	class="row-span-full row-start-2 -mt-40 flex flex-col justify-center space-y-6 text-left sm:row-start-2 sm:mt-0 sm:justify-normal md:mx-0"
>
	<div class="flex items-center space-x-2">
		<AtSign class="text-secondary-500" />
		<h1 class="text-3xl">Din e-post</h1>
	</div>
	<form
		use:enhance={async (event) => {
			attemptedSubmit = true;

			if (!emailValid) {
				event.cancel();
			}

			return async ({ result }) => {
				if (result.type === 'success') {
					goto('/opprett-konto/legg-til-adresser');
				}
			};
		}}
		method="POST"
		class="flex w-sm max-w-lg flex-col space-y-6 sm:w-lg"
	>
		<label class="label">
			<span class="label-text"> E-post </span>
			<div class="relative">
				<input
					type="text"
					id="email"
					name="email"
					class="input"
					bind:value={email}
					oninput={() => (attemptedSubmit = false)}
					class:border-red-500!={(attemptedSubmit && !emailValid) || form?.errors?.email}
					class:border-2!={(attemptedSubmit && !emailValid) || form?.errors?.email}
				/>
				{#if (attemptedSubmit && !emailValid) || form?.errors.email}
					<AlertCircle
						class="pointer-events-none absolute top-1/2 right-5 size-6 -translate-y-1/2 text-red-500"
					/>
				{/if}
			</div>
			{#if (attemptedSubmit && !emailValid) || form?.errors?.email}
				<p class=" text-sm text-red-500">Ugyldig e-post</p>
			{/if}
		</label>

		<button
			class="form-next-button"
			type="submit"
			class:opacity-90!={!emailValid}
			class:bg-[#58585c]!={!emailValid}
			class:text-white!={!emailValid}
			class:cursor-help={!emailValid}
			aria-disabled={!emailValid}
		>
			<span class="flex-1 text-lg"> Fortsett </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>
