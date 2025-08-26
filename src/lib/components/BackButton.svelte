<script lang="ts">
	import { goto } from '$app/navigation';
	import { MoveLeft } from '@lucide/svelte/icons';

	function goBack() {
		if (history.length > 1) {
			history.back();
		} else {
			goto('/');
		}
	}
</script>

<div class="m-10 flex items-center md:mx-0">
	<button onclick={goBack} class="flex items-center gap-3 hover:underline">
		<MoveLeft />
		<span>Tilbake</span>
	</button>
</div>
