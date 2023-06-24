import type { Filtering } from '$lib/types/api.types';

export default function filteringToQuery(filtering?: Filtering): string {
	if (!filtering || Object.keys(filtering).length < 1) return '';
	const filters: string[] = [];

	for (const column in filtering) {
		const columnFilters = filtering[column];
		for (const filter of columnFilters) {
			const { operator, value, group } = filter;
			filters.push(`${column},${operator},${value};${group}`);
		}
	}

	return `filter=${filters.join(';').replace(/(and|or)$/i, '')}`;
}
