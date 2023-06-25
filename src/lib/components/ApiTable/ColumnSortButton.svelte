<script lang="ts">
	import type { Sorting } from '$lib/types/api.types';
	import type { Writable } from 'svelte/store';

	export let sortingStore: Writable<Sorting>;
	export let column: string;
	export let refresh: () => void;

	const handleClick = () => {
		if ($sortingStore[column] === undefined) {
			$sortingStore = {
				...$sortingStore,
				[column]: 'ASC'
			};
		} else if ($sortingStore[column] === 'ASC') {
			$sortingStore = {
				...$sortingStore,
				[column]: 'DESC'
			};
		} else {
			const obj = { ...$sortingStore };
			delete obj[column];
			$sortingStore = obj;
		}
		refresh();
	};
</script>

<button type="button" class="column-sort-btn" on:click={handleClick}>
	<i
		class="bi bi-{$sortingStore[column] === 'ASC'
			? 'sort-alpha-down'
			: $sortingStore[column] === 'DESC'
			? 'sort-alpha-up'
			: 'dot'}"
	/>
</button>
