<script>
	import { ArrowRight, User } from '@lucide/svelte/icons';
</script>

<div class="row-start-2 m-10 flex flex-col space-y-6 text-left md:mx-0">
	<div class="flex items-center space-x-2">
		<User class="text-secondary-500" />
		<h1 class="text-3xl">Litt kort om deg</h1>
	</div>
	<form class="flex w-md flex-col">
		<div class="mb-10 space-y-4">
			<label class="label">
				<span class="label-text"> Fornavn </span>
				<input type="text" id="firstname" name="firstname" class="input" required />
			</label>
			<label class="label">
				<span class="label-text"> Etternavn </span>
				<input type="text" id="lastname" name="lastname" class="input" required />
			</label>
			<label class="label">
				<span class="label-text"> Fødselsdato </span>
				<input type="date" id="dateOfBirth" name="dateOfBirth" class="input" required />
			</label>
		</div>
		<button
			class="bg-secondary-500 flex w-full items-center justify-between rounded-full px-4 py-3 text-black"
		>
			<span class="flex-1 text-lg"> Fortsett </span>
			<span class="ml-auto"> <ArrowRight class="size-7" /> </span>
		</button>
	</form>
</div>
