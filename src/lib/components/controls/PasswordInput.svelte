<script lang="ts">
	import ControlWrap from './ControlWrap.svelte';
	export let id: string;
	export let value: string = '';

	let type: 'password' | 'text';
	$: type = 'password';

	const togglePassword = (): void => {
		if (type === 'text') {
			type = 'password';
		} else {
			type = 'text';
		}
	};
</script>

<ControlWrap>
	{#if type === 'password'}
		<input type="password" bind:value {id} {...$$props} on:blur />
	{:else}
		<input type="text" bind:value {id} {...$$props} on:blur />
	{/if}
	<button type="button" slot="icon" on:click|preventDefault={togglePassword}>
		<i class="bi bi-{type === 'password' ? 'eye' : 'eye-slash'}" />
	</button>
</ControlWrap>
