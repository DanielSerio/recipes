import type { Filtering, GetMany, PagingParams, Sorting } from '$lib/types/api.types';
import filteringToQuery from '$lib/utility/filtering-to-query';
import pagingToQuery from '$lib/utility/paging-to-query';
import sortingToQuery from '$lib/utility/sorting-to-query';
import httpCommon from './http-common';

export default class ApiTableService {
	public static async getMany(
		token: string,
		entityName: string,
		paging?: PagingParams,
		sorting?: Sorting,
		filtering?: Filtering
	) {
		const pagingQuery = pagingToQuery(paging);
		const sortingQuery = sortingToQuery(sorting);
		const filteringQuery = filteringToQuery(filtering);
		const queries = [pagingQuery, sortingQuery, filteringQuery].filter((v) => v.trim().length);
		const routeName = entityName === 'Book' ? 'recipe-book' : entityName.toLowerCase();
		const response = await httpCommon.get(
			`/${routeName}${queries.length ? `?${queries.join('&')}` : ''}`,
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);

		return (await response.data) as GetMany<object>;
	}

	public static async delete(token: string, entityName: string, id: string) {
		const routeName = entityName === 'Book' ? 'recipe-book' : entityName.toLowerCase();
		const response = await httpCommon.delete(`/${routeName}/${id}`);
		return await response.data;
	}
}
