<script lang="ts">
	import isValidFile from '$lib/validators/file-validator';
	export let files: FileList;
	export let accept: string = 'application/JSON';
	export let showDisclaimer = false;
	export let expectedType: { [k: string]: { value: string; optional?: true } };
	import { slide } from 'svelte/transition';

	let fileError: null | Error = null;

	const removeFile = () => {
		files = {} as FileList;
	};

	async function onChange() {
		if (files && files.length && files.item(0) !== null) {
			const isValid = await isValidFile(files.item(0) as File, expectedType);
			if (!isValid) {
				const error = new Error(`Schemas do not match`);
				error.name = 'FileError';
				console.error(error);
				fileError = error;
				removeFile();
			} else {
				fileError = null;
			}
		}
	}
</script>

<div class="single-file-drop">
	{#if showDisclaimer}
		<small class="disclaimer">
			<span class="icon">
				<i class="bi bi-exclamation-triangle" />
			</span>
			<span class="text"> Currently only supports JSON format </span>
		</small>
	{/if}
	{#if fileError}
		<small class="file-error">
			<span class="icon">
				<i class="bi bi-exclamation-triangle" />
			</span>
			<span class="text"> Invalid JSON format </span>
		</small>
	{/if}
	{#if files && files.length}
		<div class="file-indicator" transition:slide={{ duration: 80 }}>
			<span class="name">
				<span class="icon">
					<i class="bi bi-file-earmark-code" />
				</span>
				<span class="text">{files[0].name}</span>
			</span>
			<button type="button" on:click={removeFile}>
				<i class="bi bi-x" />
			</button>
		</div>
	{:else}
		<label for="file" class="dropzone" transition:slide={{ duration: 80 }}>
			<input id="file" multiple={false} {accept} type="file" bind:files on:change={onChange} />
			<div class="dropzone-wrap">
				<span class="icon">
					<i class="bi bi-file-earmark-code" />
				</span>
				<span class="text">Click to add JSON file</span>
			</div>
		</label>
	{/if}
</div>
