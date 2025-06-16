<script lang="ts">
	import { enhance } from '$app/forms';
	import { ArrowRight, User, AlertCircle } from '@lucide/svelte/icons';
	import type { PageProps } from './$types.js';
	import { goto } from '$app/navigation';

	let { form }: PageProps = $props();

	const placeholder = 'dd.mm.yyyy';
	let attemptedSubmit = $state(false);

	let firstname = $state('');
	let lastname = $state('');
	let dob = $state('');

	let remainingPlaceholder = $derived(placeholder.slice(dob.length));

	let firstnameValid = $derived(
		firstname.trim().length > 0 && /^[A-Za-zæøåÆØÅ\-]+$/.test(firstname)
	);
	let lastnameValid = $derived(lastname.trim().length > 0 && /^[A-Za-zæøåÆØÅ\-]+$/.test(lastname));

	let dobValid = $derived(isValidDob(dob));

	function isValidDob(input: string): boolean {
		const pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
		if (!pattern.test(input)) return false;

		const [dayStr, monthStr, yearStr] = input.split('.');
		const year = parseInt(yearStr, 10);
		const month = parseInt(monthStr, 10);
		const day = parseInt(dayStr, 10);

		const now = new Date();
		const currentYear = now.getFullYear();

		if (year >= currentYear) return false;

		const testDate = new Date(year, month - 1, day);
		return (
			testDate.getFullYear() === year &&
			testDate.getMonth() === month - 1 &&
			testDate.getDate() === day
		);
	}

	function handleDobInput(event: Event) {
		attemptedSubmit = false;
		const input = event.target as HTMLInputElement;
		const raw = input.value.replace(/\D/g, '').slice(0, 8); // keep only digits

		let formatted = '';
		if (raw.length > 0) formatted += raw.slice(0, 2);
		if (raw.length >= 2) formatted += '.' + raw.slice(2, 4);
		if (raw.length >= 4) formatted += '.' + raw.slice(4);

		dob = formatted;
	}

	async function handleDobBackspace(event: KeyboardEvent) {
		if (event.key !== 'Backspace') return;

		const input = event.target as HTMLInputElement;
		const cursor = input.selectionStart ?? 0;

		// If cursor is right after a dot, remove dot + preceding digit
		if (cursor > 0 && dob[cursor - 1] === '.') {
			event.preventDefault();

			const before = dob.slice(0, cursor - 2);
			const after = dob.slice(cursor);
			dob = before + after;
		}
	}
</script>

<div
	class="row-span-full row-start-2 -mt-30 flex flex-col justify-center space-y-6 text-left sm:mt-0 sm:justify-normal md:mx-0"
>
	<div class="flex items-center space-x-2">
		<User class="text-secondary-500" />
		<h1 class="text-3xl">Litt kort om deg</h1>
	</div>

	<form
		method="POST"
		use:enhance={async (event) => {
			attemptedSubmit = true;

			if (!firstnameValid || !lastnameValid || !dobValid) {
				event.cancel();
			}

			return async ({ result }) => {
				if (result.type === 'success') {
					goto('/opprett-konto/ny-bruker/epost');
				}
			};
		}}
		class="flex w-sm max-w-lg flex-col sm:w-lg"
	>
		<div class="mb-10 space-y-4">
			<label class="label">
				<span class="label-text"> Fornavn </span>
				<div class="relative">
					<input
						type="text"
						id="firstname"
						name="firstname"
						class="input"
						bind:value={firstname}
						oninput={() => (attemptedSubmit = false)}
						class:border-red-500!={(attemptedSubmit && !firstnameValid) || form?.errors?.firstname}
						class:border-2!={(attemptedSubmit && !firstnameValid) || form?.errors?.firstname}
					/>
					{#if (attemptedSubmit && !firstnameValid) || form?.errors?.firstname}
						<AlertCircle
							class="pointer-events-none absolute top-1/2 right-5 size-6 -translate-y-1/2 text-red-500"
						/>
					{/if}
				</div>
				{#if (attemptedSubmit && !firstnameValid) || form?.errors?.firstname}
					<p class=" text-sm text-red-500">Ugyldig fornavn. Bruk kun bokstaver og bindestrek.</p>
				{/if}
			</label>

			<label class="label">
				<span class="label-text"> Etternavn </span>
				<div class="relative">
					<input
						type="text"
						id="lastname"
						name="lastname"
						class="input"
						bind:value={lastname}
						oninput={() => (attemptedSubmit = false)}
						class:border-red-500!={(attemptedSubmit && !lastnameValid) || form?.errors?.lastname}
						class:border-2!={(attemptedSubmit && !lastnameValid) || form?.errors?.lastname}
					/>
					{#if (attemptedSubmit && !lastnameValid) || form?.errors?.lastname}
						<AlertCircle
							class="pointer-events-none absolute top-1/2 right-5 size-6 -translate-y-1/2 text-red-500"
						/>
					{/if}
				</div>
				{#if (attemptedSubmit && !lastnameValid) || form?.errors?.lastname}
					<p class=" text-sm text-red-500">Ugyldig etternavn. Bruk kun bokstaver og bindestrek.</p>
				{/if}
			</label>
			<label class="label">
				<span class="label-text"> Fødselsdato </span>

				<div class="relative">
					<input
						class="input"
						class:border-red-500!={(attemptedSubmit && !dobValid) || form?.errors?.dob}
						class:border-2!={(attemptedSubmit && !dobValid) || form?.errors?.dob}
						type="text"
						id="dob"
						name="dob"
						inputmode="numeric"
						bind:value={dob}
						oninput={handleDobInput}
						onkeydown={handleDobBackspace}
						autocomplete="off"
						autocorrect="off"
						spellcheck="false"
					/>
					<div class="placeholder-overlay">
						<span class="filled-mask">{dob}</span>{remainingPlaceholder}
					</div>
					{#if (attemptedSubmit && !dobValid) || form?.errors?.dob}
						<AlertCircle
							class="pointer-events-none absolute top-1/2 right-5 size-6 -translate-y-1/2 text-red-500"
						/>
					{/if}
				</div>
				{#if (attemptedSubmit && !dobValid) || form?.errors?.dob}
					<p class=" text-sm text-red-500">Ugyldig fødselsdato</p>
				{/if}
			</label>
		</div>

		<button
			type="submit"
			class:opacity-90!={!firstnameValid || !dobValid || !lastnameValid}
			class:bg-[#58585c]!={!firstnameValid || !dobValid || !lastnameValid}
			class:text-white!={!firstnameValid || !dobValid || !lastnameValid}
			class:cursor-help={!firstnameValid || !lastnameValid || !dobValid}
			aria-disabled={!firstnameValid || !lastnameValid || !dobValid}
			class="form-next-button"
		>
			<span class="flex-1 text-lg"> Fortsett </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>

<style>
	input::placeholder {
		color: #ffffff;
		opacity: 0.7;
	}

	.placeholder-overlay {
		position: absolute;
		top: 1.25em;
		left: 1.3em;
		pointer-events: none;
		color: #999;
		font-size: 1rem;
		font-family: inherit;
		letter-spacing: 0.075em;
		user-select: none;
		z-index: 1;
	}
	.placeholder-overlay::before {
		content: attr(data-filled);
		color: transparent;
	}

	.filled-mask {
		color: transparent;
	}
</style>
