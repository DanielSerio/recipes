<script lang="ts">
	import type { PagingParams } from '$lib/types/api.types';
	import type { Writable } from 'svelte/store';
	export let refresh: () => void | Promise<void>;
	export let pagingStore: Writable<PagingParams>;
	export let availableLimits: number[];
	export let totalPages: number;
	export let totalRecords: number;
	let currentPageInputValue: number = Math.ceil(
		($pagingStore.offset + $pagingStore.limit) / $pagingStore.limit
	);

	$: currentPage = ($pagingStore.offset + $pagingStore.limit) / $pagingStore.limit;
	$: isLastPage = currentPage === totalPages;
	$: isFirstPage = currentPage === 1;

	function setCurrentPageInputValue() {
		currentPageInputValue = Math.ceil(
			($pagingStore.offset + $pagingStore.limit) / $pagingStore.limit
		);
	}

	async function gotToFirstPage() {
		$pagingStore = {
			...$pagingStore,
			offset: 0
		};
		setCurrentPageInputValue();
		await refresh();
	}
	async function gotToLastPage() {
		const lastPageOffset = (totalPages - 1) * $pagingStore.limit;
		$pagingStore = {
			...$pagingStore,
			offset: lastPageOffset
		};
		setCurrentPageInputValue();
		await refresh();
	}

	async function gotToNextPage() {
		const nextPageOffset = $pagingStore.offset + $pagingStore.limit;
		$pagingStore = {
			...$pagingStore,
			offset: nextPageOffset
		};
		setCurrentPageInputValue();
		await refresh();
	}

	async function gotToPrevPage() {
		const prevPageOffset = $pagingStore.offset - $pagingStore.limit;
		$pagingStore = {
			...$pagingStore,
			offset: prevPageOffset
		};
		setCurrentPageInputValue();
		await refresh();
	}
	const handleInputChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const value = `${target.value}`.trim();

		if (isNaN(+value) || +value < 1 || +value > totalPages) {
			setCurrentPageInputValue();
		} else {
			const newOffset = (+value - 1) * $pagingStore.limit;
			$pagingStore = {
				...$pagingStore,
				offset: newOffset
			};
			refresh();
		}
	};
</script>

<div class="api-table-paging">
	<div class="records-area">
		<span class="text"
			><b>{totalRecords}</b> record{totalRecords === 1 ? '' : 's'} in <b>{totalPages}</b>
			page{totalPages === 1 ? '' : 's'} of</span
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
		<div class="page-area">
			<input
				class="page-input"
				type="number"
				bind:value={currentPageInputValue}
				on:change={handleInputChange}
			/>
			<span class="muted">/ {totalPages}</span>
		</div>
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
