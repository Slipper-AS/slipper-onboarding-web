import { test, expect } from '@playwright/test';

test.describe('Elhub Verification', () => {
	//Setup before each test
	test.beforeEach(async ({ page }) => {
		await page.context().addCookies([
			{
				name: 'bearer_token',
				value:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiIrNDc0MDQwNDA0MCIsImV4cCI6MTc1MDI0OTY4Nywib3JpZ0lhdCI6MTc1MDI0OTM4N30.aBunbPJYR1dy5CG1FOIeibLa3js4D7HI7rNZPSKZ-_U',
				path: '/',
				domain: 'localhost',
				secure: true,
				sameSite: 'Lax',
			},
		]);
	});

	test('should display Elhub page', async ({ page }) => {
		await page.goto('/opprett-konto/legg-til-adresser');
		await page.click('button:has-text("Aksepter")');
		await expect(page).toHaveURL(/\/opprett-konto\/legg-til-adresser/);
		await expect(page.locator('h1')).toContainText(/Legg til dine adresser/i);

		await expect(page.locator('button')).toHaveCount(1);
		await expect(page.locator('img')).toHaveCount(1);
	});

	test('Shows loading, then success or timeout', async ({ page }) => {
		await page.goto('/opprett-konto/adresser');
		await page.click('button:has-text("Aksepter")');

		const success = page.locator('h1:has-text("Bingo")');
		const timeout = page.locator('h1:has-text("Elhub bruker lang tid")');

		// Wait for one of the locators to appear by wrapping in Promise.race
		await Promise.race([expect(success).toBeVisible(), expect(timeout).toBeVisible()]);
	});

	test('Adresser page shows waiting state immediately while fetch is pending', async ({
		page,
		context,
	}) => {
		let resolveFetch: () => void;

		await context.clearCookies();

		const fetchDelay = new Promise<void>((resolve) => {
			resolveFetch = resolve;
		});

		// Intercept the fetch to the data endpoint and delay it
		await context.route('**/opprett-konto/adresser/data', async (route) => {
			await fetchDelay;

			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ status: 'success', data: [] }),
			});
		});

		// Go to the page (triggers the fetch, which now hangs)
		await page.goto('/opprett-konto/adresser');

		// Assert loading state is shown *while* fetch is pending
		await expect(page.getByText(/venter/i)).toBeVisible();
	});
});
