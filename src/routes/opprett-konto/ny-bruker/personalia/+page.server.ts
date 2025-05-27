import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

const GRAPHQL_ENDPOINT = 'https://api.slipper.no/graphql/';

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		const formData = await request.formData();
		const firstName = formData.get('firstname')?.toString();
		const lastName = formData.get('lastname')?.toString();
		const birthDate = formData.get('dateOfBirth')?.toString();

		if (!firstName || !lastName || !birthDate) {
			return fail(400, { error: 'Alle felter er påkrevd.' });
		}

		// Parse dd/mm/yyyy
		const [day, month, year] = birthDate.split('/');

		if (!day || !month || !year) {
			return fail(400, { error: 'Ugyldig datoformat.' });
		}

		// Create ISO date string yyyy-mm-dd
		const birthDateISO = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

		const mutation = `
			mutation UpdateUser(
				$firstName: String, 
				$lastName: String, 
				$birthDate: Date
			) {
				userUpdate(
					lastName: $lastName, 
					firstName: $firstName, 
					birthDate: $birthDate
					){				
					user{
                        lastName
                        firstName
                        birthDate
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
						firstName,
						lastName,
						birthDateISO,
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
		throw redirect(303, '/opprett-konto/ny-bruker/epost');
	},
};
