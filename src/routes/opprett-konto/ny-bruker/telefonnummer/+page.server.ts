import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { COOKIE_KEYS } from '$lib/cookies';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const phone = data.get('phone')?.toString();

		if (!phone) {
			return { error: 'Telefonnummer mangler' };
		}

		const loginMutation = `
			mutation mymutatation ($number: String = "${phone}"){
				smsLogin(number: $number, lang: "no") {
					found,
					token,
					hasUser
				}
			}
		`;

		try {
			const response = await fetch(PUBLIC_API_BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: loginMutation,
				}),
			});

			const result = await response.json();

			if (result.errors) {
				console.warn('SMS login failed or not found:', result);
				return fail(401, { error: 'Telefonnummeret ble ikke funnet eller er ugyldig.' });
			}

			cookies.set(COOKIE_KEYS.otpPhone, phone, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60,
			});

			redirect(303, '/opprett-konto/ny-bruker/otp');
		} catch (error) {
			console.error('Error during phone login:', error);
			return { error: 'Noe gikk galt under innlogging med telefonnummer.' };
		}
	},
};
