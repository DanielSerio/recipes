import type { Sorting } from '$lib/types/api.types';

export default function sortingToQuery(sorting?: Sorting): string {
	if (!sorting || Object.keys(sorting).length < 1) return '';
	const sorts: string[] = [];

	for (const column in sorting) {
		const dir = sorting[column];
		sorts.push(`${column},${dir}`);
	}

	return `sort=${sorts.join(';')}`;
}
