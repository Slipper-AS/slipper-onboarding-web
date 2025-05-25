<script>
	import { ArrowRight, AtSign } from '@lucide/svelte/icons';
</script>

<div class="row-start-2 m-10 flex flex-col space-y-6 text-left md:mx-0">
	<div class="flex items-center space-x-2">
		<AtSign class="text-secondary-500" />
		<h1 class="text-3xl">Din e-post</h1>
	</div>
	<form method="POST" class="flex w-md flex-col space-y-6">
		<label class="label">
			<span class="label-text"> E-post </span>
			<input type="email" id="email" name="email" class="input" required />
		</label>

		<button
			class="bg-secondary-500 flex w-full items-center justify-between rounded-full px-4 py-3 text-black"
			type="submit"
		>
			<span class="flex-1 text-lg"> Fortsett </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>
