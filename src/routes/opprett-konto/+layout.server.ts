import type { RequestEvent } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }: RequestEvent) => {
	const referrer = cookies.get('shortName');
	return {
		hasReferrer: !!referrer,
		referrer,
	};
};
