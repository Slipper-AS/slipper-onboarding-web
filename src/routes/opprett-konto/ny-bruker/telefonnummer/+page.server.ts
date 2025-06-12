import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		const data = await request.formData();
		const phone = data.get('phone')?.toString();

		if (!phone) {
			return { error: 'Telefonnummer mangler' };
		}

		const loginMutation = `mutation mymutatation ($number: String = "${phone}"){smsLogin(number: $number, lang: "no") {found,token,hasUser}}`;

		await fetch(PUBLIC_API_BASE_URL, {
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
