import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { COOKIE_KEYS } from '$lib/cookies';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (token) {
		cookies.set(COOKIE_KEYS.bearerToken, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60,
		});

		redirect(302, '/opprett-konto/legg-til-adresser');
	} else {
		redirect(302, '/error');
	}
};
