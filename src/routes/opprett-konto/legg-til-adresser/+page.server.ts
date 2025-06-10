import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
const GRAPHQL_ENDPOINT = 'https://api.slipper.no/graphql/';

export const actions: Actions = {
	default: async ({ cookies }: import('@sveltejs/kit').RequestEvent) => {
		const bearerToken = cookies.get('bearer_token');

		const redirectUrl =
			import.meta.env.MODE === 'development'
				? 'https://localhost:3000/opprett-konto/adresser'
				: 'https://id.slipper.no/opprett-konto/adresser';

		const mutation = `
        mutation {
            elhub(redirect: "${redirectUrl}") {
                requestUrl
            }
        }
        `;

		const response = await fetch(GRAPHQL_ENDPOINT, {
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
