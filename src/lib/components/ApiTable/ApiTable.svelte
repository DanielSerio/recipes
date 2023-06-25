<script lang="ts">
	import ApiTableService from '$lib/services/api-table.service';
	import { userStore } from '$stores/user';
	import ApiTablePaging from './ApiTablePaging.svelte';
	import RecordDeleteButton from './RecordDeleteButton.svelte';
	import useApiTable from '$lib/hooks/api-table';
	import ColumnSortButton from './ColumnSortButton.svelte';
	import ApiTableFiltering from './ApiTableFiltering.svelte';

	export let entityIcon: string;
	export let entityName: string;
	export let url: string;
	export let deleteColumnKey: string;
	export let fields: App.ApiTableField[];
	const { resultStore, refresh, pagingStore, sortingStore, filteringStore } =
		useApiTable(entityName);

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

	async function handleRowDelete(record: any) {
		const id: string = record[deleteColumnKey];
		if ($userStore !== 'LOADING' && $userStore.token) {
			await ApiTableService.delete($userStore.token, entityName, id);
			await refresh();
		}
	}
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
		<ApiTableFiltering {filteringStore} {fields} {refresh} />
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
										<span class="text">
											{field.title}
										</span>
										<span class="actions">
											<ColumnSortButton column={field.column} {sortingStore} {refresh} />
										</span>
									</div>
								</th>
							{/each}
						</tr>
					</thead>
					{#if !$resultStore}
						<div>No Results</div>
					{:else}
						<tbody>
							{#each $resultStore.records as record}
								<tr>
									<td>
										<div class="t-cell">
											<span class="col-name">Actions</span>
											<RecordDeleteButton onDelete={async () => await handleRowDelete(record)} />
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
			{#if $resultStore}
				<ApiTablePaging
					availableLimits={availableRecordLimits}
					{pagingStore}
					{refresh}
					totalPages={$resultStore.paging.totals.pages}
					totalRecords={$resultStore.paging.totals.records}
				/>
			{/if}
		</footer>
	</div>
</div>
