import type { Load } from '@sveltejs/kit';

export const load: Load = ({ params }) => {
	return {
		uom_id: params.uom_id
	};
};
