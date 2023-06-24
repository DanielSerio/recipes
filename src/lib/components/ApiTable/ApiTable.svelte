<script lang="ts">
	import ApiTableService from '$lib/services/api-table.service';
	import type { Filtering, GetMany, PagingParams, Sorting } from '$lib/types/api.types';
	import { userStore } from '$stores/user';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import ApiTablePaging from './ApiTablePaging.svelte';
	import RecordDeleteButton from './RecordDeleteButton.svelte';

	export let entityIcon: string;
	export let entityName: string;
	export let url: string;
	export let deleteColumnKey: string;
	export let fields: App.ApiTableField[];
	let pagingStore = writable<PagingParams>({
		limit: 25,
		offset: 0
	});
	let filteringStore = writable<Filtering>({});
	let sortingStore = writable<Sorting>({});
	let result: GetMany<object & { [k: string]: any }>;

	async function fetchData() {
		if ($userStore !== 'LOADING' && $userStore.token) {
			result = await ApiTableService.getMany(
				$userStore.token,
				entityName,
				{
					limit: $pagingStore.limit,
					offset: $pagingStore.offset
				},
				{ ...$sortingStore },
				{ ...$filteringStore }
			);
		}
	}

	function applyTransforms(
		field: App.ApiTableField,
		record: object & { [k: string]: any }
	): string {
		let value = `${record[field.column]}`;
		for (const transform in field.transform) {
			value = field.transform[transform](value);
		}

		return value;
	}

	function getRecordHref(hrefString: string, record: object & { [k: string]: any }): string {
		const re = /\$\w+\$/g;
		const matches = hrefString.match(re) || [];
		let newHref: string = `${hrefString}`;
		for (const match of matches) {
			const colname = `${match}`.replace(/\$/g, '');
			newHref = newHref.replace(match, record[colname]);
		}

		return newHref;
	}

	const availableRecordLimits = [1, 5, 10, 15, 25, 50, 100];

	async function handleRowDelete(id: string) {
		if ($userStore !== 'LOADING' && $userStore.token) {
			await ApiTableService.delete($userStore.token, entityName, id);
			await fetchData();
		}
	}

	onMount(async () => {
		if ($userStore !== 'LOADING') {
			pagingStore.subscribe(async (value) => {
				await fetchData();
			});

			sortingStore.subscribe(async (value) => {
				if (
					Object.keys(value) &&
					result &&
					JSON.stringify(result.sorting) !== JSON.stringify(value)
				) {
					await fetchData();
				}
			});

			filteringStore.subscribe(async (value) => {
				if (
					Object.keys(value) &&
					result &&
					JSON.stringify(result.filtering) !== JSON.stringify(value)
				) {
					await fetchData();
				}
			});
		}
	});
</script>

<div class="api-table-root">
	<div class="api-table-wrap">
		<header class="api-table-header">
			<section class="title">
				<h1 class="h3">
					<span class="icon">
						<i class="bi bi-{entityIcon}" />
					</span><span class="text">{entityName} &raquo; Overview</span>
				</h1>
			</section>
			<ul class="link-toolbar">
				<li>
					<a href="/dashboard/{url}/create">
						<span class="text">Create</span>
						<span class="icon">
							<i class="bi bi-plus" />
						</span>
					</a>
				</li>
				<li>
					<a href="/dashboard/{url}/import">
						<span class="text">Import</span>
						<span class="icon">
							<i class="bi bi-upload" />
						</span>
					</a>
				</li>
			</ul>
		</header>
		<div class="api-table">
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>
								<div class="t-cell head">*</div>
							</th>
							{#each fields as field}
								<th>
									<div class="t-cell head {field.short ? 'short' : ''}">
										{field.title}
									</div>
								</th>
							{/each}
						</tr>
					</thead>
					{#if !result}
						<div>No Results</div>
					{:else}
						<tbody>
							{#each result.records as record}
								<tr>
									<td>
										<div class="t-cell">
											<span class="col-name">Actions</span>
											<RecordDeleteButton
												onDelete={async () => await handleRowDelete(record[deleteColumnKey])}
											/>
										</div>
									</td>
									{#each fields as field}
										<td class:short={field.short}>
											<div class="t-cell">
												<span class="col-name">{field.title}</span>
												{#if field.href}
													<a href={getRecordHref(field.href, record)}>
														{#if field.transform && Object.keys(field.transform).length}
															{applyTransforms(field, record)}
														{:else}
															{record[field.column] || ''}
														{/if}
													</a>
												{:else}
													<span class={field.badge ? `badge ${field.badge.color}` : undefined}>
														{#if field.transform && Object.keys(field.transform).length}
															{applyTransforms(field, record)}
														{:else}
															{record[field.column] || ''}
														{/if}
													</span>
												{/if}
											</div>
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					{/if}
				</table>
			</div>
		</div>
		<footer class="api-table-footer">
			{#if result}
				<ApiTablePaging
					availableLimits={availableRecordLimits}
					{pagingStore}
					totalPages={result.paging.totals.pages}
					totalRecords={result.paging.totals.records}
				/>
			{/if}
		</footer>
	</div>
</div>
