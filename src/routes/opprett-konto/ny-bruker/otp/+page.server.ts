import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { COOKIE_KEYS } from '$lib/cookies';
import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ cookies }) => {
	const phone = cookies.get(COOKIE_KEYS.otpPhone);

	if (!phone) {
		redirect(303, '/opprett-konto/ny-bruker/telefonnummer');
	}

	return { phone };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const phone = cookies.get(COOKIE_KEYS.otpPhone);

		if (!phone) {
			console.warn('Attempted OTP login without phone cookie');
			return { error: 'Mangler OTP' };
		}

		const formData = await request.formData();
		const code = formData.getAll('otp[]').join('');

		const loginMutation = ` 
			mutation mymutatation($number: String!, $code:Int!) {
        		smsLogin(number: $number, code: $code, lang: "no") {
					found
					token
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
					variables: {
						number: phone,
						code: parseInt(code),
					},
				}),
			});

			const result = await response.json();
			const bearerToken = result?.data?.smsLogin?.token;

			if (bearerToken) {
				cookies.set(COOKIE_KEYS.bearerToken, bearerToken, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					secure: true,
					maxAge: 60 * 60,
				});
			} else {
				console.warn('No token returned from smsLogin:', result);
				return fail(401, { error: 'Feil kode. Prøv igjen.' });
			}
		} catch (error) {
			console.error('Error during OTP login:', error);
			return fail(500, { error: 'En feil oppstod. Vennligst prøv igjen senere.' });
		}
	},
};
