<script lang="ts">
	import ApiTable from '$lib/components/ApiTable/ApiTable.svelte';
	import collapseString from '$lib/utility/collapse-string';
	const fields: App.ApiTableField[] = [
		{
			column: 'uom_id',
			title: 'ID',
			short: true,
			transform: {
				collapse: (value) => collapseString(value)
			},
			href: '/dashboard/uoms/$uom_id$'
		},
		{
			column: 'uom_abbv',
			title: 'Abbv.',
			href: '/dashboard/uoms/$uom_id$',
			short: true
		},
		{
			column: 'uom_name',
			title: 'Name',
			href: '/dashboard/uoms/$uom_id$'
		}
	];
</script>

<div class="page dashboard-uoms-page">
	<main id="content" class="main-content">
		<ApiTable {fields} url="uoms" entityName="UOM" entityIcon="rulers" deleteColumnKey="uom_id" />
	</main>
</div>
