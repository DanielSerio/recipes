<script lang="ts">
	import UOMService from '$lib/services/uom.service';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { userStore } from '$stores/user';
	import type { UomRecord } from '$lib/types/models/uom.types';
	import FormControl from '$lib/components/forms/FormControl.svelte';
	import AsyncButton from '$lib/components/buttons/AsyncButton.svelte';
	export let data: PageData & { uom_id: string };
	let uomRecord: UomRecord;
	let responseError: null | Error = null;

	let abbv: string = '';
	let name: string = '';
	onMount(async () => {
		if (typeof window !== 'undefined' && $userStore !== 'LOADING' && $userStore.token) {
			const { status, record } = await UOMService.get($userStore.token, data.uom_id);
			if (status === 200) {
				uomRecord = record as UomRecord;
				abbv = uomRecord.uom_abbv;
				name = uomRecord.uom_name;
				responseError = null;
			}
		}
	});

	async function onSubmit() {
		if ($userStore !== 'LOADING' && $userStore.token) {
			await UOMService.update($userStore.token, data.uom_id, { uom_abbv: abbv, uom_name: name });
		}
	}
</script>

<div class="page uom-edit-page">
	<main id="content" class="main-content">
		<header class="dashboard-page-header">
			<h1 class="h3">UOM &raquo {data.uom_id}</h1>
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
				<AsyncButton type="submit" color="primary" initialIconName="save" onClick={onSubmit}
					>Save</AsyncButton
				>
			</footer>
		</form>
	</main>
</div>
