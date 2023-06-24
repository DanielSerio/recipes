import ApiTableService from '$lib/services/api-table.service';
import type { Filtering, GetMany, PagingParams, Sorting } from '$lib/types/api.types';
import { userStore, type UserState } from '$stores/user';
import { writable } from 'svelte/store';

export default function useApiTable<RecordType extends object & { [k: string]: any }>(
	entityName: string
) {
	const needRefresh = writable<boolean>(true);

	const resultStore = writable<GetMany<RecordType> | null>(null);
	const pagingStore = writable<PagingParams>({
		limit: 25,
		offset: 0
	});

	const filteringStore = writable<Filtering>({});

	const sortingStore = writable<Sorting>({});
	async function getUserStore(): Promise<UserState> {
		return await new Promise<UserState>((resolve) => {
			const sub = userStore.subscribe((value) => {
				if (value !== 'LOADING') {
					resolve(value);
				}
			});
			sub();
		});
	}

	async function getPaging(): Promise<PagingParams> {
		return await new Promise<PagingParams>((resolve) => {
			const sub = pagingStore.subscribe((value) => {
				resolve(value);
			});
			sub();
		});
	}

	async function getSorting(): Promise<Sorting> {
		return await new Promise<Sorting>((resolve) => {
			const sub = sortingStore.subscribe((value) => {
				resolve(value);
			});
			sub();
		});
	}

	async function getFiltering(): Promise<Filtering> {
		return await new Promise<Filtering>((resolve) => {
			const sub = filteringStore.subscribe((value) => {
				resolve(value);
			});
			sub();
		});
	}

	async function fetchData() {
		const user = await getUserStore();
		const paging = await getPaging();
		const sorting = await getSorting();
		const filtering = await getFiltering();

		if (user && user.token) {
			const result = await ApiTableService.getMany(
				user.token,
				entityName,
				{
					limit: paging.limit,
					offset: paging.offset
				},
				{ ...sorting },
				{ ...filtering }
			);
			resultStore.set(result as GetMany<RecordType>);
		}
	}

	const refresh = () => needRefresh.set(true);

	needRefresh.subscribe(async (value) => {
		if (value) {
			await fetchData().then(() => needRefresh.set(false));
		}
	});

	return {
		resultStore,
		sortingStore,
		pagingStore,
		filteringStore,
		refresh
	};
}
