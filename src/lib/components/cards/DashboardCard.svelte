<script lang="ts">
	export let color: string | undefined = undefined;
</script>

<div class="dashboard-card {color ? color : ''} {$$props.class ? $$props.class : ''}">
	{#if $$slots.top}
		<div class="card-top">
			<slot name="top" />
		</div>
	{/if}
	<div class="card-body">
		<slot />
	</div>
	{#if $$slots.bottom}
		<div class="card-bottom">
			<slot name="bottom" />
		</div>
	{/if}
</div>
