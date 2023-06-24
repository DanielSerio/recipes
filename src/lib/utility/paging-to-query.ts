import type { PagingParams } from '$lib/types/api.types';

export default function pagingToQuery(paging?: PagingParams): string {
	if (!paging || Object.keys(paging).length < 1) return '';
	return `limit=${paging.limit}&offset=${paging.offset}`;
}
