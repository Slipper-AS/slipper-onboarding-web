import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }: RequestEvent) => {
	cookies.delete('shortName', { path: '/' });
	redirect(302, 'opprett-konto/');
};
