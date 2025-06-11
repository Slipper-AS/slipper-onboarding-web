import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_API_BASE_URL, PUBLIC_REDIRECT_ELHUB_URL } from '$env/static/public';

export const actions: Actions = {
	default: async ({ cookies }: import('@sveltejs/kit').RequestEvent) => {
		const bearerToken = cookies.get('bearer_token');

		const mutation = `
        mutation {
            elhub(redirect: "${PUBLIC_REDIRECT_ELHUB_URL}") {
                requestUrl
            }
        }
        `;

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
		const requestUrl = result?.data?.elhub?.requestUrl;

		if (!requestUrl) {
			return { error: 'Failed to get requestUrl' };
		}

		throw redirect(302, requestUrl);
	},
};

export const load: PageServerLoad = async ({ cookies }: RequestEvent) => {
	const referralCode = cookies.get('referredByCookie');
	const bearerToken = cookies.get('bearer_token');

	const referralCodeUpdateMutation = `
		mutation myMutation($referredByCode: String!) {
			referralCodeUpdate(referredByCode: $referredByCode) {
			success
		}
}
	`;

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
};
