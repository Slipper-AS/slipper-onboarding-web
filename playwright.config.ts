import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun -b run build && bun run preview',
		port: 4173,
	},
	use: { baseURL: 'http://localhost:4173' },
	testDir: 'e2e',
});
