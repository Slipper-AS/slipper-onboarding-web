import { error } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from './$types.js';

const GRAPHQL_ENDPOINT = 'https://api.slipper.no/graphql/';

export const load: PageServerLoad = async ({ params, cookies }: RequestEvent) => {
	const referralCode = params.referralCode;

	const query = `
		query q($code: String!) {
			shortNameFromReferralCode(code: $code)
		}
	`;

	const response = await fetch(GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query,
			variables: {
				code: referralCode,
			},
		}),
	});

	const result = await response.json();

	if (!response.ok || result.errors || !result.data?.shortNameFromReferralCode) {
		throw error(404, 'Ugyldig eller utløpt invitasjon');
	}

	const referrerShortName = result.data.shortNameFromReferralCode;

	cookies.set('shortName', referrerShortName, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
		maxAge: 60 * 60 * 24 * 30,
	});

	const referrer = cookies.get('shortName');

	return {
		referrerShortName,
		referrer,
	};
};
