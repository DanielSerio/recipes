<script lang="ts">
	import type { PagingParams } from '$lib/types/api.types';
	import type { Writable } from 'svelte/store';
	export let refresh: () => void | Promise<void>;
	export let pagingStore: Writable<PagingParams>;
	export let availableLimits: number[];
	export let totalPages: number;
	export let totalRecords: number;

	$: currentPage = ($pagingStore.offset + $pagingStore.limit) / $pagingStore.limit;
	$: isLastPage = currentPage === totalPages;
	$: isFirstPage = currentPage === 1;

	async function gotToFirstPage() {
		$pagingStore = {
			...$pagingStore,
			offset: 0
		};
		await refresh();
	}
	async function gotToLastPage() {
		const lastPageOffset = (totalPages - 1) * $pagingStore.limit;
		$pagingStore = {
			...$pagingStore,
			offset: lastPageOffset
		};
		await refresh();
	}

	async function gotToNextPage() {
		const nextPageOffset = $pagingStore.offset + $pagingStore.limit;
		$pagingStore = {
			...$pagingStore,
			offset: nextPageOffset
		};
		await refresh();
	}

	async function gotToPrevPage() {
		const prevPageOffset = $pagingStore.offset - $pagingStore.limit;
		$pagingStore = {
			...$pagingStore,
			offset: prevPageOffset
		};
		await refresh();
	}
</script>

<div class="api-table-paging">
	<div class="records-area">
		<span class="text"
			>{totalRecords} record{totalRecords === 1 ? '' : 's'} in {totalPages} page{totalPages === 1
				? ''
				: 's'} of</span
		>
		<select bind:value={$pagingStore.limit} on:change={refresh}>
			{#each availableLimits as limitOption}
				<option value={limitOption}>{limitOption}</option>
			{/each}
		</select>
	</div>
	<div class="paging-area">
		<div class="btn-group">
			<button disabled={isFirstPage} on:click={gotToFirstPage}>
				<i class="bi bi-chevron-double-left" />
			</button>
			<button disabled={isFirstPage} on:click={gotToPrevPage}>
				<i class="bi bi-chevron-left" />
			</button>
		</div>
		{Math.ceil(($pagingStore.offset + $pagingStore.limit) / $pagingStore.limit)} / {totalPages}
		<div class="btn-group">
			<button disabled={isLastPage} on:click={gotToNextPage}>
				<i class="bi bi-chevron-right" />
			</button>
			<button disabled={isLastPage} on:click={gotToLastPage}>
				<i class="bi bi-chevron-double-right" />
			</button>
		</div>
	</div>
</div>
