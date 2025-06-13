import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_API_BASE_URL, PUBLIC_REDIRECT_ELHUB_URL } from '$env/static/public';
import { COOKIE_KEYS } from '$lib/cookies';

export const actions: Actions = {
	default: async ({ cookies }) => {
		const bearerToken = cookies.get(COOKIE_KEYS.bearerToken);

		if (!bearerToken) {
			return { error: 'Authentication required' };
		}

		const mutation = `
        mutation {
            elhub(redirect: "${PUBLIC_REDIRECT_ELHUB_URL}") {
                requestUrl
            }
        }
        `;

		let requestUrl: string | undefined;

		try {
			const response = await fetch(PUBLIC_API_BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${bearerToken}`,
				},
				body: JSON.stringify({
					query: mutation,
				}),
			});

			const result = await response.json();
			requestUrl = result?.data?.elhub?.requestUrl;

			if (!requestUrl) {
				return { error: 'Failed to get requestUrl' };
			}
		} catch (error) {
			return { error: 'Failed to initiate Elhub request' };
		}

		redirect(302, requestUrl);
	},
};

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
