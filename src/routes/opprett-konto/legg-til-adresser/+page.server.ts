import type { PageServerLoad } from './$types';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { COOKIE_KEYS } from '$lib/cookies';

export const load: PageServerLoad = async ({ cookies }) => {
	const referralCode = cookies.get(COOKIE_KEYS.referredByCookie);
	const bearerToken = cookies.get(COOKIE_KEYS.bearerToken);

	if (!bearerToken) {
		return null;
	}

	if (referralCode) {
		const referralCodeUpdateMutation = `
		mutation myMutation($referredByCode: String!) {
			referralCodeUpdate(referredByCode: $referredByCode) {
				success
			}
		}
	`;

		try {
			await fetch(PUBLIC_API_BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${bearerToken}`,
				},
				body: JSON.stringify({
					query: referralCodeUpdateMutation,
					variables: {
						referredByCode: referralCode,
					},
				}),
			});
		} catch (error) {
			console.error('Failed to update referral code:', error);
		}
	}
};
