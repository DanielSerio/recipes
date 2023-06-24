<script lang="ts">
	export let color: string;
	export let initialIconName: string = 'send';
	export let submittingIconName: string = 'arrow-clockwise';
	export let submittedIconName: string = 'check-circle';
	export let onClick: (() => void | Promise<void>) | undefined = undefined;
	export let type: 'submit' | 'reset' | 'button' = 'button';
	export let disabled: boolean = false;

	let isSubmitting: boolean = false;
	let hasSubmitted: boolean = false;

	$: iconName =
		!isSubmitting && !hasSubmitted
			? initialIconName
			: isSubmitting
			? submittingIconName
			: submittedIconName;
	$: iconState = isSubmitting ? 'spinning' : '';

	async function handleClick() {
		hasSubmitted = false;
		isSubmitting = true;
		if (onClick) {
			await onClick();
		}
		isSubmitting = false;
		hasSubmitted = true;
	}
</script>

{#if type === 'submit'}
	<button
		type="submit"
		class="btn-async btn btn-filled {color} {$$props.class ? $$props.class : ''}"
		{disabled}
		on:click={handleClick}
	>
		<span class="text">
			<slot />
		</span>
		<span class="icon {iconState}">
			<i class="bi bi-{iconName}" />
		</span>
	</button>
{:else if type === 'reset'}
	<button
		type="reset"
		class="btn-async btn btn-filled {color} {$$props.class ? $$props.class : ''}"
		{disabled}
		on:click={handleClick}
	>
		<span class="text">
			<slot />
		</span>
		<span class="icon {iconState}">
			<i class="bi bi-{iconName}" />
		</span>
	</button>
{:else}
	<button
		type="button"
		class="btn-async btn btn-filled {color} {$$props.class ? $$props.class : ''}"
		{disabled}
		on:click={handleClick}
	>
		<span class="text">
			<slot />
		</span>
		<span class="icon {iconState}">
			<i class="bi bi-{iconName}" />
		</span>
	</button>
{/if}
