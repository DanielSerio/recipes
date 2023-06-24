import { writable, type Writable } from 'svelte/store';
import jwtDecode from 'jwt-decode';
import type { UserAccountReducedRecord } from '$lib/types/models/user-account.types';

export interface UserStateBase {
	token: string | null;
	email?: string;
	profile_img_url?: string;
	first_name?: string | null;
	last_name?: string | null;
}

export interface LoggedInUser extends UserStateBase {
	token: string;
	email: string;
	profile_img_url: string;
	first_name: string | null;
	last_name: string | null;
}

export interface LoggedOutUser extends UserStateBase {
	token: null;
	email?: never;
	profile_img_url?: never;
	first_name?: never;
	last_name?: never;
}

export type UserState = LoggedInUser | LoggedOutUser;

export interface UserAccountStoreObject {
	userStore: Writable<'LOADING' | UserState>;
	setUserState: (token: string | null) => void;
}

function createUserStore(): UserAccountStoreObject {
	const key = 'ut';
	const userStore = writable<'LOADING' | UserState>('LOADING');
	const setUserState = (auth: string | null) => {
		userStore.update((state: 'LOADING' | UserState) => {
			if (state === 'LOADING') return state;
			if (auth) {
				console.log(auth);
				const decoded = jwtDecode(auth) as UserAccountReducedRecord;
				return {
					token: auth,
					email: decoded.email,
					profile_img_url: decoded.profile_img_url,
					first_name: decoded.first_name,
					last_name: decoded.last_name
				};
			} else {
				return {
					token: null
				};
			}
		});
	};

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(key);

		if (!saved) {
			userStore.set({ token: null });
		} else {
			userStore.set(JSON.parse(saved));
		}

		userStore.subscribe((value) => {
			if (value !== 'LOADING') {
				localStorage.setItem(key, JSON.stringify(value));
			}
		});
	}

	return {
		userStore,
		setUserState
	};
}

export const { userStore, setUserState } = createUserStore();
