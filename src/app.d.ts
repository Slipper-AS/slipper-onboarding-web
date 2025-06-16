// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	function gtag(
		command: 'js' | 'config' | 'event',
		targetIdOrEventName: string,
		params?: Record<string, any>
	): void;
}

export {};
