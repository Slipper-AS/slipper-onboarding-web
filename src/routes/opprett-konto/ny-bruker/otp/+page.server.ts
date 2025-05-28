import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';

const GRAPHQL_ENDPOINT = 'https://api.slipper.no/graphql/';

export const load: PageServerLoad = ({ cookies }: import('@sveltejs/kit').RequestEvent) => {
	const phone = cookies.get('otp_phone');

	if (!phone) {
		throw redirect(303, 'opprett-konto/ny-bruker/telefonnummer');
	}

	return { phone };
};

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		const phone = cookies.get('otp_phone');
		const formData = await request.formData();
		const code = formData.getAll('otp[]').join('');

		if (!/^\d{6}$/.test(code)) {
			return fail(400, { error: 'Ugyldig kode' });
		}

		const loginMutation = `mutation mymutatation($number: String!, $code:Int!) {
        smsLogin(number: $number, code: $code, lang: "no") {
        found
        token
        hasUser
    }
}`;
		const response = await fetch(GRAPHQL_ENDPOINT, {
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

		const data = await response.json();
		console.log('Response from GraphQL:', data);
		const bearerToken = data.data.smsLogin.token;

		if (bearerToken) {
			cookies.set('bearer_token', bearerToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
				maxAge: 60 * 60,
			});
		}
		// On success:
		throw redirect(303, '/opprett-konto/ny-bruker/personalia');
	},
};
