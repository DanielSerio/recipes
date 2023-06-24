<script lang="ts">
	import { goto } from '$app/navigation';
	import AsyncButton from '$lib/components/buttons/AsyncButton.svelte';
	import FormControl from '$lib/components/forms/FormControl.svelte';
	import UOMService from '$lib/services/uom.service';
	import { userStore } from '$stores/user';
	let abbv: string = '';
	let name: string = '';
	let responseError: null | Error = null;

	async function onSubmit() {
		if ($userStore !== 'LOADING' && $userStore.token) {
			try {
				await UOMService.create($userStore.token, { uom_abbv: abbv, uom_name: name });
				responseError = null;
				await goto('/dashboard/uoms');
			} catch (e) {
				responseError = e as Error;
			}
		}
	}
</script>

<div class="page uom-create-page">
	<main id="content" class="main-content">
		<header class="dashboard-page-header">
			<h1 class="h3">UOM &raquo Create</h1>
			<a href="/dashboard/uoms">Back</a>
		</header>
		{#if responseError}
			<span class="response-error">
				{responseError.name} = {responseError.message}
			</span>
		{/if}
		<form class="form" on:submit|preventDefault>
			<FormControl>
				<label for="abbv" slot="label" class="label">Abbv.</label>
				<input type="text" id="abbv" bind:value={abbv} />
			</FormControl>
			<FormControl>
				<label for="name" slot="label" class="label">Name</label>
				<input type="text" id="name" bind:value={name} />
			</FormControl>
			<footer class="form-controls">
				<AsyncButton type="submit" color="primary" initialIconName="plus" onClick={onSubmit}
					>Add</AsyncButton
				>
			</footer>
		</form>
	</main>
</div>
