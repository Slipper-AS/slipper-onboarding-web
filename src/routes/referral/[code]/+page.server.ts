import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { COOKIE_KEYS } from '$lib/cookies.js';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const referralCode = params.code;

	if (!referralCode || referralCode.length < 3) {
		throw error(400, 'Ugyldig invitasjonskode');
	}

	const query = `
		query q($code: String!) {
			shortNameFromReferralCode(code: $code)
		}
	`;

	try {
		const response = await fetch(PUBLIC_API_BASE_URL, {
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

		cookies.delete(COOKIE_KEYS.shortName, { path: '/' });

		const cookieOptions = {
			path: '/',
			httpOnly: true,
			sameSite: 'lax' as const,
			secure: true,
			maxAge: 60 * 60 * 24 * 30, // 30 days
		};

		cookies.set(COOKIE_KEYS.shortName, referrerShortName, cookieOptions);
		cookies.set(COOKIE_KEYS.referredByCookie, referralCode, cookieOptions);

		return {
			referrerShortName,
			referrer: referralCode,
		};
	} catch (err) {
		console.error('Error fetching referral code:', err);
		throw error(500, 'Kunne ikke hente invitasjonskode');
	}
};
