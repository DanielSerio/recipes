import type { UserAccountLoginParams } from '$lib/types/models/user-account.types';
import httpCommon from './http-common';

export interface LoginBaseObject {
	status: 200 | 400 | 500;
	token?: string;
}

export interface FailedLogin extends LoginBaseObject {
	status: 400 | 500;
	token?: never;
}

export interface SuccessfulLogin extends LoginBaseObject {
	status: 200;
	token: string;
}

export default class UserService {
	public static async login(
		params: UserAccountLoginParams
	): Promise<SuccessfulLogin | FailedLogin> {
		try {
			const response = await httpCommon.post('/account/login', { ...params });
			const responseData = await response.data;
			const authHeader =
				(await response.headers['X-Authorization']) || response.headers['x-authorization'];

			if (responseData.status === 200) {
				return {
					status: 200,
					token: `${authHeader}`.replace(/^bearer\s/i, '')
				};
			} else {
				return { status: 400 };
			}
		} catch (e) {
			return { status: 500 };
		}
	}

	public static async logout() {
		await httpCommon.get('/account/logout');
	}
}
