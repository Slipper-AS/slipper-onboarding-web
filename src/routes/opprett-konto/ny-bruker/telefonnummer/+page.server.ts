import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

const GRAPHQL_ENDPOINT = 'https://api.slipper.no/graphql/';

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		const data = await request.formData();
		const phone = data.get('phone')?.toString();

		if (!phone) {
			return { error: 'Telefonnummer mangler' };
		}

		const loginMutation = `mutation mymutatation ($number: String = "${phone}"){smsLogin(number: $number, lang: "no") {found,token,hasUser}}`;

		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: loginMutation,
			}),
		});

		// Save phone to cookie
		cookies.set('otp_phone', phone, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60,
		});

		throw redirect(303, '/opprett-konto/ny-bruker/otp');
	},
};
