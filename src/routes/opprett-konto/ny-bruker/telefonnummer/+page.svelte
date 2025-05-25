<script lang="ts">
	import { ArrowRight } from '@lucide/svelte/icons';
</script>

<div class="row-start-2 m-10 flex flex-col space-y-6 pb-20 text-left md:mx-0">
	<h1 class="text-3xl">Logg inn med ditt telefonnummer</h1>
	<p>Vi sender deg en kode på SMS</p>
	<form method="POST" class="flex flex-col space-y-4">
		<label class="label">
			<span class="label-text"> Telefonnummer </span>
			<input type="tel" id="phone" name="phone" class="input" required />
		</label>
		<button
			class="bg-secondary-500 flex w-full items-center justify-between rounded-full px-4 py-3 text-black"
		>
			<span class="flex-1 text-lg"> Fortsett </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>
