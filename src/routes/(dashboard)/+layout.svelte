<script lang="ts">
	import DashboardNav from '$lib/components/navigation/DashboardNav.svelte';
	import '$lib/styles/layout/_dashboard.scss';
	import '$lib/styles/module/_dashboard-nav.scss';
	import '$lib/styles/module/_dashboard-nav-item.scss';
	import '$lib/styles/module/_api-table.scss';
	import '$lib/styles/module/_single-file-drop.scss';
</script>

<div class="layout dashboard-layout">
	<DashboardNav />
	<slot />
</div>
