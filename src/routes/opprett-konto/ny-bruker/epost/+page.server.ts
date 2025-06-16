import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { Actions } from './$types.js';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();

		const errors: Record<string, string> = {};

		if (!email) {
			errors.email = 'Ugyldig e-postadresse';
			return fail(400, { errors });
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
			const response = await fetch(PUBLIC_API_BASE_URL, {
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
				errors.result = 'Kunne ikke oppdatere bruker.';
				return fail(500, { errors });
			}
		} catch (err) {
			errors.result = 'Noe gikk galt';
			return fail(500, { errors });
		}
	},
};
