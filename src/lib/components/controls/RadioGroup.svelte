<script lang="ts">
	export let name: string;
	export let value: string = '';
	export let options: { value: string; label: string }[] = [];

	export let onChange: (() => void) | undefined = undefined;
</script>

<div class="radio-group">
	{#each options as option}
		<div class="radio-control">
			<input
				type="radio"
				bind:group={value}
				name="{name}_{option.value}"
				id="{name}_{option.value}"
				value={option.value}
				on:change={onChange}
			/>
			<label for="{name}_{option.value}">{option.label}</label>
		</div>
	{/each}
</div>
