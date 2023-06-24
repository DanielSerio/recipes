<script lang="ts">
	export let onDelete: () => Promise<void>;
	let popupIsOpen = false;
	let handleConfirm = async () => {
		await onDelete();
		popupIsOpen = false;
	};
</script>

<div class="record-delete-button">
	<button type="button" on:click={() => (popupIsOpen = true)}>
		<i class="bi bi-trash" />
	</button>
	{#if popupIsOpen}
		<div class="popup">
			<small>Are you sure?</small>
			<button on:click={() => (popupIsOpen = false)}>cancel</button>
			<button on:click={handleConfirm}>yes</button>
		</div>
	{/if}
</div>
