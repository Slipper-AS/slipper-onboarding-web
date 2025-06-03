<script lang="ts">
	import { ArrowRight } from '@lucide/svelte/icons';

	let phone = '';
	$: phoneIsValid = /^\d{8}$/.test(phone);
</script>

<div class="row-start-2 m-10 flex flex-col space-y-6 pb-20 text-left md:mx-0">
	<h1 class="text-3xl">Logg inn med ditt telefonnummer</h1>
	<p>Vi sender deg en kode på SMS</p>
	<form method="POST" class="flex flex-col space-y-4">
		<label class="label">
			<span class="label-text"> Telefonnummer </span>
			<div
				class="focus-within:ring-primary focus-within:border-primary flex w-full max-w-md items-center overflow-hidden rounded-lg border border-gray-500 bg-[#1E293B] py-0 transition focus-within:ring-2"
			>
				<span class="mx-5 flex justify-center"> +47 </span>
				<input
					type="tel"
					id="phone"
					name="phone"
					class="w-full border-0 focus:border-0 focus:ring-0 focus:outline-none"
					required
					bind:value={phone}
				/>
			</div>
		</label>
		<button class="form-next-button" type="submit" disabled={!phoneIsValid}>
			<span class="flex-1 text-lg"> Fortsett </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>
