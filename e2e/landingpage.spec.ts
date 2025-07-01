import { test, expect } from '@playwright/test';

test.describe('Landing page tests', () => {
	test('Redirects to /opprett-konto if no referral code', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveURL(/\/opprett-konto$/);
	});

	test('Content on /opprett-konto', async ({ page }) => {
		await page.goto('/opprett-konto');
		expect(page.locator('h1')).toContainText(/Lag en konto og kom i gang/i);
		const links = page.locator('a');
		await expect(links).toHaveCount(3);
	});

	test('Loads landing page if valid referral code', async ({ page }) => {
		await page.goto('/referral/BQKLP2');
		await expect(page).toHaveURL(/\/referral\/BQKLP2/);

		const sections = page.locator('section');
		const buttons = page.locator('button');
		const images = page.locator('img');

		const cookieConsent = await page.evaluate(() => localStorage.getItem('cookie_consent'));

		if (cookieConsent) {
			await expect(buttons).toHaveCount(2);
		} else {
			await expect(buttons).toHaveCount(4);
		}

		await expect(sections).toHaveCount(3);
		await expect(images).toHaveCount(3);

		await expect(page.locator('h1').nth(0)).toContainText(/ har invitert deg til Slipper/i);
		await expect(page.locator('h1').nth(1)).toContainText(
			/Appen som sørger for at du alltid har den billigste strømavtalen/i
		);
		await expect(page.locator('h1').nth(2)).toContainText(
			/Bli med å snu opp ned på strømbransjen/i
		);
	});

	test('Shows error on invalid referral code', async ({ page }) => {
		const response = await page.goto('/referral/INVALIDCODE');
		expect(response?.status()).toBeGreaterThanOrEqual(400);
		await expect(page.locator('h1')).toContainText(/500/i);
	});

	test('Checks if shortName cookie is set', async ({ page, context }) => {
		await page.goto('/referral/BQKLP2');
		// Perform actions that should set the cookie

		const cookies = await context.cookies();
		const myShortNameCookie = cookies.find((c) => c.name === 'shortName');
		const myReferralCodeCookie = cookies.find((c) => c.name === 'referredByCookie');
		expect(myShortNameCookie).toBeDefined();
		expect(myReferralCodeCookie).toBeDefined();
		expect(myShortNameCookie?.value).toBe('Hilmar%20S.%20E.');
		expect(myReferralCodeCookie?.value).toBe('BQKLP2');
	});

	test('Shows referralPill if shortName cookie is set', async ({ page, context }) => {
		await page.goto('/referral/BQKLP2');

		await page.locator('button[name="opprett-konto"]').click();

		await expect(page).toHaveURL('/opprett-konto');
		const cookies = await context.cookies();
		const myShortNameCookie = cookies.find((c) => c.name === 'shortName');
		if (myShortNameCookie) {
			const successDiv = page.locator('div.text-success-500');
			await expect(successDiv).toBeVisible();
		}
	});
});
