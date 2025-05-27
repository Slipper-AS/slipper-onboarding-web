import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

const GRAPHQL_ENDPOINT = 'https://api.slipper.no/graphql/';

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();

		if (!email) {
			return fail(400, { error: 'Alle felter er påkrevd.' });
		}

		const mutation = `
			mutation UpdateUser(
				$email: String, 
			) {
				userUpdate(
					email: $email, 
					){				
					user{
                        email
						}
				}
			}
		`;

		try {
			const response = await fetch(GRAPHQL_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookies.get('bearer_token')}`,
				},
				body: JSON.stringify({
					query: mutation,
					variables: {
						email,
					},
				}),
			});

			const result = await response.json();

			if (result.errors) {
				console.error('GraphQL errors:', result.errors);
				return fail(500, { error: 'Kunne ikke oppdatere bruker.' });
			}
		} catch (err) {
			return fail(500, { error: 'Noe gikk galt' });
		}
		throw redirect(303, '/opprett-konto/legg-til-adresser');
	},
};
