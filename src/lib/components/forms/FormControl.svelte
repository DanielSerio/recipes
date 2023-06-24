<script lang="ts">
	export let errorName: string | null = null;
	const getErrorMessage = (name: string) => {
		if (name === 'required') {
			return `This field is required`;
		} else if (name.startsWith('min-length')) {
			return `Minimum length of ${(name.match(/\d+/g) || [0])[0]} required`;
		} else if (name === 'not-match') {
			return `Fields do not match`;
		} else if (name === 'email') {
			return `Invalid email address`;
		}
	};
</script>

<div class="form-control {errorName ? 'error' : ''}">
	<slot name="label" />
	<slot />
	{#if errorName}
		<small class="control-error">
			<i class="bi bi-exclamation-triangle" />
			<span>{getErrorMessage(errorName)}</span>
		</small>
	{/if}
</div>
