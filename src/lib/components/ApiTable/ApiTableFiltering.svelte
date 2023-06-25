<script lang="ts">
	import type { ColumnFilter, ColumnFilterOperator, Filtering } from '$lib/types/api.types';
	import { columnFilterOperatorNameMap } from '$lib/utility/constants';
	import type { Writable } from 'svelte/store';
	import RadioGroup from '../controls/RadioGroup.svelte';
	export let fields: App.ApiTableField[] = [];
	export let filteringStore: Writable<Filtering>;
	export let refresh: () => void;
	let currentFilterGroup: 'and' | 'or' = 'and';
	let currentFilterOperator = 'eq';
	let currentFilterValue: string = '';
	let currentFilterColumn = fields[0].column;

	async function addFilter() {
		const item: ColumnFilter = {
			value: currentFilterValue,
			operator: currentFilterOperator as ColumnFilterOperator,
			group: currentFilterGroup
		};
		if (!$filteringStore[currentFilterColumn]) {
			$filteringStore = {
				...$filteringStore,
				[currentFilterColumn]: [item]
			};
		} else {
			$filteringStore = {
				...$filteringStore,
				[currentFilterColumn]: [...$filteringStore[currentFilterColumn], item]
			};
		}
		refresh();
		currentFilterValue = '';
		currentFilterGroup = 'and';
		currentFilterOperator = 'eq';
		currentFilterColumn = fields[0].column;
	}

	async function removeFilter(column: string, filter: ColumnFilter) {
		const getFilterString = (f: ColumnFilter) => `${column},${f.operator},${f.value},${f.group}`;
		const removeFilterString = getFilterString(filter);

		$filteringStore = {
			...$filteringStore,
			[column]: [...$filteringStore[column]].filter((f) => {
				const fs = getFilterString(f);
				return fs !== removeFilterString;
			})
		};

		refresh();
	}
</script>

<div class="api-table-filtering">
	{#if Object.keys($filteringStore)}
		<ul class="applied-filter-lines">
			{#each Object.keys($filteringStore) as column}
				{#if $filteringStore[column] && $filteringStore[column].length}
					{#each $filteringStore[column] as filter}
						<li>
							<b>{fields.filter((f) => f.column === column)[0].title}</b>
							<select bind:value={filter.operator} on:change={refresh}>
								{#each Object.keys(columnFilterOperatorNameMap) as key}
									<option value={key}>{columnFilterOperatorNameMap[key]}</option>
								{/each}
							</select>
							<input type="text" bind:value={filter.value} on:change={refresh} />
							<RadioGroup
								bind:value={filter.group}
								name="{column}_group"
								onChange={refresh}
								options={[
									{
										value: 'and',
										label: 'And'
									},
									{
										value: 'or',
										label: 'Or'
									}
								]}
							/>
							<button on:click={() => removeFilter(column, filter)}>
								<i class="bi bi-trash" />
							</button>
						</li>
					{/each}
				{/if}
			{/each}
		</ul>
	{/if}
	<div class="filter-add-line">
		<select id="columnSelect" bind:value={currentFilterColumn}>
			{#each fields as field}
				<option value={field.column}>{field.title}</option>
			{/each}
		</select>
		<select bind:value={currentFilterOperator}>
			{#each Object.keys(columnFilterOperatorNameMap) as key}
				<option value={key}>{columnFilterOperatorNameMap[key]}</option>
			{/each}
		</select>
		<input type="text" bind:value={currentFilterValue} />
		<RadioGroup
			bind:value={currentFilterGroup}
			name="group"
			options={[
				{
					value: 'and',
					label: 'And'
				},
				{
					value: 'or',
					label: 'Or'
				}
			]}
		/>
		<button
			disabled={!currentFilterValue.trim().length}
			class="btn btn-filled primary"
			on:click={addFilter}>Add</button
		>
	</div>
</div>
