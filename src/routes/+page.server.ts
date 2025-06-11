import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { COOKIE_KEYS } from '$lib/cookies';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get(COOKIE_KEYS.shortName)) {
		cookies.delete(COOKIE_KEYS.shortName, { path: '/' });
	}
	redirect(302, 'opprett-konto/');
};
