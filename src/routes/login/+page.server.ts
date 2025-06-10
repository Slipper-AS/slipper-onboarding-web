import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import type { RequestEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, cookies }: RequestEvent) => {
	const token = url.searchParams.get('token');

	if (token) {
		cookies.set('bearer_token', token, {
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
