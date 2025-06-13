import { COOKIE_KEYS } from '$lib/cookies';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const referrer = cookies.get(COOKIE_KEYS.shortName);
	return {
		hasReferrer: !!referrer,
		referrer,
	};
};
