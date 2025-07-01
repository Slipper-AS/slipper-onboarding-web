import { test, expect } from '@playwright/test';

test.describe('SMS Login Authentication Flow', () => {
	//Check if the sms login page is accessible
	test.describe('Telephone Number Form', () => {
		test('should access SMS login page', async ({ page }) => {
			await page.goto('/opprett-konto');
			await expect(page).toHaveURL(/\/opprett-konto$/);

			const smsLoginLink = page.locator('a:has-text("Har du ikke Vipps?")');
			await expect(smsLoginLink).toBeVisible();
			await smsLoginLink.click();
			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/telefonnummer$/);

			await expect(page.locator('h1')).toContainText(/Logg inn med ditt telefonnummer/i);
		});

		test('should disable send code button until phone input is filled', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			const sendCodeButton = page.locator('button:has-text("Fortsett")');
			const phoneInput = page.locator('input[name="phone"]');

			// Initially, the button should be disabled
			await expect(sendCodeButton).toBeDisabled();

			// Fill the input field
			await phoneInput.fill('40404040');

			// Now, the button should be enabled
			await expect(sendCodeButton).toBeEnabled();
		});

		test('should show error for invalid phone number', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.fill('input[name="phone"]', '123');
			const sendCodeButton = page.locator('button:has-text("Fortsett")');
			await expect(sendCodeButton).toBeDisabled();
		});
	});
	test.describe('OTP Verification Form', () => {
		test('should redirect to phone input page if no phone cookie is set', async ({ page }) => {
			await page.context().clearCookies();
			await page.goto('/opprett-konto/ny-bruker/otp');
			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/telefonnummer$/);
		});

		test('should send verification code for valid phone number', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.fill('input[name="phone"]', '34567890');
			await page.click('button:has-text("Fortsett")');
			await expect(page.locator('text=Tast inn koden sendt til +47 34567890')).toBeVisible();
		});

		test('should show error for invalid verification code', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.fill('input[name="phone"]', '34567890');
			await page.click('button:has-text("Fortsett")');

			await expect(page.url()).toContain('/opprett-konto/ny-bruker/otp');

			const inputs = await page.locator('input[name="otp[]"]');
			const otp = '100000'; // Invalid OTP for testing

			for (let i = 0; i < otp.length; i++) {
				await inputs.nth(i).fill(otp[i]);
			}

			// Submit the form
			await expect(page.getByRole('button', { name: /bekreft/i })).toBeEnabled();

			//Delay to simulate user typing
			await page.waitForTimeout(1000);
			await page.getByRole('button', { name: /bekreft/i }).click();

			await page.locator('button:has-text("Bekreft")').click();

			// Wait for the error message to appear
			await page.waitForTimeout(1000);

			// Wait for error message
			const errorMsg = page.getByText(/Feil kode./i);
			await expect(errorMsg).toBeVisible();

			// Expect error message to be visible
			await expect(page.getByText(/Feil kode/i)).toBeVisible();
			// Expect input fields to have error class
			for (let i = 0; i < otp.length; i++) {
				const input = inputs.nth(i);
				await expect(input).toHaveClass(/border-error-500/);
			}
		});

		test('should login successfully with valid code', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.fill('input[name="phone"]', '40404040');
			await page.click('button:has-text("Fortsett")');
			await expect(page.url()).toContain('/opprett-konto/ny-bruker/otp');

			const inputs = await page.locator('input[name="otp[]"]');
			const otp = '123456'; // Invalid OTP for testing

			for (let i = 0; i < otp.length; i++) {
				await inputs.nth(i).fill(otp[i]);
			}

			// Submit the form
			await expect(page.getByRole('button', { name: /bekreft/i })).toBeEnabled();
			//Delay to simulate user typing
			await page.waitForTimeout(1000);
			await page.getByRole('button', { name: /bekreft/i }).click();

			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/personalia/);
			await expect(page.locator('text=Litt kort om deg')).toBeVisible();
		});
	});
	test.describe('Personalia Form', () => {
		test('should keep "Fortsett" button visually disabled until all fields are filled', async ({
			page,
		}) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.fill('input[name="phone"]', '40404040');
			await page.click('button:has-text("Fortsett")');
			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/otp/);

			// Fill OTP to proceed
			const otpInputs = await page.locator('input[name="otp[]"]');
			const otp = '123456';
			for (let i = 0; i < otp.length; i++) {
				await otpInputs.nth(i).fill(otp[i]);
			}
			await page.getByRole('button', { name: /bekreft/i }).click();

			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/personalia/);

			const firstNameInput = page.locator('input[name="firstname"]');
			const lastNameInput = page.locator('input[name="lastname"]');
			const dobInput = page.locator('input[name="dob"]');
			const continueButton = page.locator('button:has-text("Fortsett")');

			// Initially, button should look disabled (e.g., have opacity or disabled class)
			await expect(continueButton).toHaveClass(/opacity-90/);

			// Fill only first name
			await firstNameInput.fill('Ola');
			await expect(continueButton).toHaveClass(/opacity-90/);

			// Fill last name
			await lastNameInput.fill('Nordmann');
			await expect(continueButton).toHaveClass(/opacity-90/);

			// Fill date of birth
			await dobInput.fill('01011990');
			// Now button should look enabled (e.g., not have opacity-50 or disabled class)
			await expect(continueButton).not.toHaveClass(/opacity-90/);
		});

		test('should show errors and red borders for invalid fields if "Fortsett" is pressed before filling all fields', async ({
			page,
		}) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.click('button:has-text("Aksepter")');
			await page.fill('input[name="phone"]', '40404040');
			await page.click('button:has-text("Fortsett")');
			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/otp/);

			// Fill OTP to proceed
			const otpInputs = await page.locator('input[name="otp[]"]');
			const otp = '123456';
			for (let i = 0; i < otp.length; i++) {
				await otpInputs.nth(i).fill(otp[i]);
			}
			await page.getByRole('button', { name: /bekreft/i }).click();

			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/personalia/);

			const firstNameInput = page.locator('input[name="firstname"]');
			const lastNameInput = page.locator('input[name="lastname"]');
			const dobInput = page.locator('input[name="dob"]');
			const continueButton = page.locator('button:has-text("Fortsett")');

			await expect(continueButton).toBeVisible();

			// Try to submit with all fields empty
			await continueButton.click({ force: true });

			//delay to ensure error messages are visible
			await page.waitForTimeout(2000);

			// All fields should have error class and error message
			await expect(firstNameInput).toHaveClass(/border-red-500/);
			await expect(page.getByText(/Ugyldig fornavn/i)).toBeVisible();

			await expect(lastNameInput).toHaveClass(/border-red-500/);
			await expect(page.getByText(/Ugyldig etternavn/i)).toBeVisible();

			await expect(dobInput).toHaveClass(/border-red-500/);
			await expect(page.getByText(/Ugyldig fødselsdato/i)).toBeVisible();

			// Fill only first name and try again
			await firstNameInput.fill('Ola');
			await continueButton.click({ force: true });

			await expect(lastNameInput).toHaveClass(/border-red-500/);
			await expect(page.getByText(/Ugyldig etternavn/i)).toBeVisible();

			await expect(dobInput).toHaveClass(/border-red-500/);
			await expect(page.getByText(/Ugyldig fødselsdato/i)).toBeVisible();
		});

		test('should submit personalia form successfully when all fields are valid', async ({
			page,
		}) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.click('button:has-text("Aksepter")');
			await page.fill('input[name="phone"]', '40404040');
			await page.click('button:has-text("Fortsett")');
			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/otp/);

			// Fill OTP to proceed
			const otpInputs = await page.locator('input[name="otp[]"]');
			const otp = '123456';
			for (let i = 0; i < otp.length; i++) {
				await otpInputs.nth(i).fill(otp[i]);
			}
			await page.getByRole('button', { name: /bekreft/i }).click();

			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/personalia/);

			await page.fill('input[name="firstname"]', 'Ola');
			await page.fill('input[name="lastname"]', 'Nordmann');
			await page.fill('input[name="dob"]', '01011990');

			const continueButton = page.locator('button:has-text("Fortsett")');
			await expect(continueButton).toBeEnabled();
			await continueButton.click();

			// Expect to be redirected to the next step (e.g., address or confirmation)
			await expect(page).not.toHaveURL(/\/personalia$/);
		});
	});

	test.describe('Epost Form', () => {
		test('should keep "Fortsett" button disabled until email is filled', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/epost');
			const emailInput = page.locator('input[name="email"]');
			const continueButton = page.locator('button:has-text("Fortsett")');

			await expect(emailInput).toBeVisible();
			await expect(continueButton).toBeDisabled();

			await emailInput.fill('test@example.com');
			await expect(continueButton).toBeEnabled();
		});

		test('should show error for invalid email format', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/epost');
			await page.click('button:has-text("Aksepter")');
			const emailInput = page.locator('input[name="email"]');
			const continueButton = page.locator('button:has-text("Fortsett")');

			await emailInput.fill('invalid-email');
			await continueButton.click({ force: true });

			await expect(emailInput).toHaveClass(/border-red-500/);
			await expect(page.getByText(/Ugyldig e-post/i)).toBeVisible();
		});

		test('should show error if email is empty and "Fortsett" is pressed', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/epost');
			const continueButton = page.locator('button:has-text("Fortsett")');

			await continueButton.click({ force: true });

			const emailInput = page.locator('input[name="email"]');
			await expect(emailInput).toHaveClass(/border-red-500/);
			await expect(page.getByText(/Ugyldig e-post/i)).toBeVisible();
		});

		test('should submit epost form successfully with valid email', async ({ page }) => {
			await page.goto('/opprett-konto/ny-bruker/telefonnummer');
			await page.click('button:has-text("Aksepter")');
			await page.fill('input[name="phone"]', '40404040');
			await page.click('button:has-text("Fortsett")');
			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/otp/);
			const otpInputs = await page.locator('input[name="otp[]"]');
			const otp = '123456'; // Valid OTP for testing
			for (let i = 0; i < otp.length; i++) {
				await otpInputs.nth(i).fill(otp[i]);
			}
			await page.getByRole('button', { name: /bekreft/i }).click();
			await expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/personalia/);
			await page.fill('input[name="firstname"]', 'Ola');
			await page.fill('input[name="lastname"]', 'Nordmann');
			await page.fill('input[name="dob"]', '01011990');
			await page.locator('button:has-text("Fortsett")').click();

			expect(page).toHaveURL(/\/opprett-konto\/ny-bruker\/epost/);
			const emailInput = page.locator('input[name="email"]');
			const continueButton = page.locator('button:has-text("Fortsett")');

			await emailInput.fill('test@example.com');
			await expect(continueButton).toBeEnabled();
			await continueButton.click();

			// Expect to be redirected to the next step (e.g., confirmation or summary)
			await expect(page).not.toHaveURL(/\/epost$/);
		});

		// SHOULD HANDLE THIS, BUT DONT DO IT NOW
		// test('should show error if email is already in use', async ({ page }) => {
		// 	await page.goto('/opprett-konto/ny-bruker/epost');
		// 	const emailInput = page.locator('input[name="email"]');
		// 	const continueButton = page.locator('button:has-text("Fortsett")');

		// 	await emailInput.fill('used@example.com');
		// 	await continueButton.click();

		// 	await expect(page.getByText(/E-postadressen er allerede i bruk/i)).toBeVisible();
		// 	await expect(emailInput).toHaveClass(/border-red-500/);
		// });
	});
});
