<script lang="ts">
	import ReferalPill from '$lib/components/opprett-konto/ReferalPill.svelte';

	let {
		children,
		data,
	}: { children: () => any; data: { hasReferrer: boolean; referrer: string | null } } = $props();
</script>

<main class="h-screen max-h-screen">
	<div class="flex h-full flex-col items-center">
		<div class=" grid h-full max-h-full max-w-md grid-rows-6 sm:grid-rows-3">
			{#if data.hasReferrer}
				<div class="row-start-1 mx-10 mt-10 flex flex-col items-center md:mx-0">
					<ReferalPill name={data.referrer} />
				</div>
			{/if}
			{@render children()}
		</div>
	</div>
</main>
