import { test, expect, devices } from '@playwright/test';

test.describe('/last-ned-app page', () => {
	test('should display app information', async ({ page }) => {
		await page.goto('/opprett-konto/last-ned-app');
		await page.click('button:has-text("Aksepter")');
		await expect(
			page.locator('h1:has-text("Last ned appen og ta smartere strømvalg")')
		).toBeVisible();
		await expect(page.locator('ul li')).toHaveCount(4);
	});

	test('should show QR code and hide download button on desktop', async ({ page }) => {
		await page.goto('/opprett-konto/last-ned-app');
		await page.click('button:has-text("Aksepter")');

		await expect(page.locator('img[alt="QR Code"]')).toBeVisible();
		await expect(page.locator('button:has-text("Last ned appen")')).toHaveCount(0);
	});

	test('should show download button and hide QR code on Android', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['Pixel 5'],
			userAgent:
				'Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
		});
		const page = await context.newPage();

		await page.goto('/opprett-konto/last-ned-app');
		await page.click('button:has-text("Aksepter")');

		await expect(page.locator('button:has-text("Last ned appen")')).toBeVisible();
		await expect(page.locator('img[alt="iPhones"]')).toHaveCount(1);
		await expect(page.locator('img[alt="QR code"]')).toHaveCount(0);
	});

	test('should redirect to Google Play Store on Android button click', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['Pixel 5'],
			userAgent:
				'Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36',
		});
		const page = await context.newPage();

		await page.goto('/opprett-konto/last-ned-app');
		await page.click('button:has-text("Aksepter")');

		await page.click('button:has-text("Last ned appen")');
		await page.waitForLoadState('domcontentloaded');

		await expect(page).toHaveURL(/play\.google\.com/);
	});

	test('should show download button and hide QR code on iPhone', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 12'],
			userAgent:
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.33 Mobile/15E148 Safari/604.1',
		});
		const page = await context.newPage();

		await page.goto('/opprett-konto/last-ned-app');
		await page.click('button:has-text("Aksepter")');

		await expect(page.locator('button:has-text("Last ned appen")')).toBeVisible();
		await expect(page.locator('img[alt="QR Code"]')).toHaveCount(0);
	});

	//Cannot test for iPhone App Store redirection due to Playwright limitations
});
