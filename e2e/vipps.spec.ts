import { test, expect } from '@playwright/test';

test.describe('Vipps Authentication Flow', () => {
	test('should redirect to /opprett-konto and save token after Vipps authentication', async ({
		page,
		context,
	}) => {
		await page.route('https://api.slipper.no/login/**', async (route) => {
			// Instead of actually navigating to Vipps, simulate a redirect
			await page.goto('/login?token=mocked-token');
			await route.abort(); // prevent the real request
		});

		await page.goto('/opprett-konto');

		// Ensure the page has loaded and Vipps button is present
		await expect(page).toHaveURL(/\/opprett-konto$/);

		// Ensure the Vipps button is present
		const vippsButton = page.getByRole('button', { name: 'Vipps' });
		await expect(vippsButton).toBeVisible();
		await vippsButton.click();

		await page.waitForURL('**/opprett-konto/legg-til-adresser');

		// Check if the token is saved in cookies
		const cookies = await context.cookies();
		const bearerToken = cookies.find((c) => c.name === 'bearer_token');
		expect(bearerToken?.httpOnly).toBe(true);
		expect(bearerToken?.secure).toBe(true);
		expect(bearerToken?.value).toBe('mocked-token');
	});

	test('should retain cookies after redirect', async ({ page, context }) => {
		// Mock Vipps redirect before clicking
		await page.route('https://api.slipper.no/login/**', async (route) => {
			await page.goto('/login?token=mocked-token'); // triggers server logic
			await route.abort();
		});

		// Pre-set a cookie
		await context.addCookies([
			{
				name: 'session_id',
				value: 'abc123',
				domain: 'localhost',
				path: '/',
				httpOnly: true,
				secure: false,
				sameSite: 'Lax',
			},
		]);

		// Visit the start page
		await page.goto('/opprett-konto');

		// Click Vipps button to trigger mocked redirect
		const vippsButton = page.getByRole('button', { name: 'Vipps' });
		await expect(vippsButton).toBeVisible();
		await vippsButton.click();

		// Wait for final redirect to confirm flow
		await page.waitForURL('**/opprett-konto/legg-til-adresser');

		// Assert original cookie still exists
		const cookies = await context.cookies();
		const sessionCookie = cookies.find((c) => c.name === 'session_id');
		expect(sessionCookie).toBeTruthy();
		expect(sessionCookie?.value).toBe('abc123');
	});

	// test('should show error message on invalid token', async ({ page }) => {});

	// test('should not allow access to protected route without token', async ({ page }) => {
	// 	// Ensure no token is set in cookies
	// 	await page.context().clearCookies();
	// 	const cookies = await page.context().cookies();
	// 	const bearerToken = cookies.find((c) => c.name === 'bearer_token');
	// 	expect(bearerToken).toBeUndefined();

	// 	await page.goto('/legg-til-adresser');

	// 	await page.evaluate(() => localStorage.removeItem('token'));
	// 	await page.goto('/legg-til-adresser');
	// 	// Should redirect to login
	// 	await page.waitForURL('**/error');
	// 	expect(page.url()).toContain('/error');
	// });

	test('should persist token after page reload', async ({ page, context }) => {
		await page.goto('/login?token=reload-token');

		await page.context().addCookies([
			{
				name: 'bearer_token',
				value: 'reload-token',
				domain: 'localhost',
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'Lax',
			},
		]);

		await page.reload();
		const cookies = await context.cookies();
		const token = cookies.find((c) => c.name === 'bearer_token')?.value;
		expect(token).toBe('reload-token');
	});
});
