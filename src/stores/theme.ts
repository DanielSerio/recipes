import { writable, type Writable } from 'svelte/store';

interface ThemeStoreObject {
	themeStore: Writable<'LOADING' | { mode: 'light' | 'dark' }>;
	toggleTheme: () => void;
}

function createThemeStore(): ThemeStoreObject {
	const themeStore: Writable<'LOADING' | { mode: 'light' | 'dark' }> = writable('LOADING');

	const toggleTheme = () =>
		themeStore.update((state: 'LOADING' | { mode: 'light' | 'dark' }) => {
			if (state === 'LOADING') return state;
			if (state.mode === 'light') return { mode: 'dark' };
			return { mode: 'light' };
		});

	if (typeof window !== 'undefined') {
		const key = 'utme';
		const saved: string | null = localStorage.getItem(key);

		if (!saved) {
			themeStore.set({ mode: 'light' });
		} else {
			themeStore.set(JSON.parse(saved));
		}

		themeStore.subscribe((state) => {
			if (state !== 'LOADING') {
				localStorage.setItem(key, JSON.stringify(state));
			}
		});
	}

	return {
		themeStore,
		toggleTheme
	};
}

export const { themeStore, toggleTheme } = createThemeStore();
