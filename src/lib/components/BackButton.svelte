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

<div class="flex items-center">
	<button onclick={goBack} class="flex items-center gap-3 hover:underline">
		<MoveLeft />
		<span>Tilbake</span>
	</button>
</div>
