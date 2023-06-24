// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface ApiTableField {
			column: string;
			title: string;
			href?: string;
			short?: true;
			transform?: {
				[k: string]: (value: string) => string;
			};
			badge?: {
				color: string;
			};
		}
	}
}

export {};
