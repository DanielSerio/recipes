<script lang="ts">
	import AsyncButton from '$lib/components/buttons/AsyncButton.svelte';
	import SingleFileDrop from '$lib/components/controls/SingleFileDrop.svelte';
	let files: FileList;
</script>

<div class="page import-page uom-import-page">
	<main id="content" class="main-content">
		<header class="dashboard-page-header">
			<h1 class="h3">UOM &raquo Import</h1>
			<a href="/dashboard/uoms">Back</a>
		</header>
		<form class="form dashboard-form">
			<SingleFileDrop
				showDisclaimer
				bind:files
				expectedType={{
					uom_abbv: { value: 'string' },
					uom_name: { value: 'string' }
				}}
			/>
			<footer class="form-controls">
				<AsyncButton disabled={!files || !files.length} initialIconName="upload" color="primary"
					>Import</AsyncButton
				>
			</footer>
		</form>
	</main>
</div>
