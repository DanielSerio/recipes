import type { SimpleResponse, SingleRecord } from '$lib/types/api.types';
import type { UomCreateParams, UomRecord, UomUpdateParams } from '$lib/types/models/uom.types';
import httpCommon from './http-common';

export default class UOMService {
	public static async create(token: string, params: UomCreateParams) {
		const response = await httpCommon.post<SimpleResponse>(
			'/uom',
			{ ...params },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return await response.data;
	}

	public static async get(token: string, uom_id: string) {
		const response = await httpCommon.get<SingleRecord<UomRecord>>(`/uom/${uom_id}`, {
			headers: { Authorization: `Bearer ${token}` }
		});
		return await response.data;
	}

	public static async update(
		token: string,
		uom_id: string,
		params: Omit<UomUpdateParams, 'uom_id'>
	) {
		const response = await httpCommon.put<SingleRecord<UomRecord>>(
			`/uom/${uom_id}`,
			{ ...params },
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		);
		return await response.data;
	}
}
