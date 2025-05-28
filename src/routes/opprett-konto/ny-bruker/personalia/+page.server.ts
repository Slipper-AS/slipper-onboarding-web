import type { Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

const GRAPHQL_ENDPOINT = 'https://api.slipper.no/graphql/';

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		const formData = await request.formData();
		const firstName = formData.get('firstname')?.toString();
		const lastName = formData.get('lastname')?.toString();
		const birthDate = formData.get('dob')?.toString();

		const errors: Record<string, string> = {};

		if (!firstName || !lastName || !birthDate) {
			if (!firstName || !(firstName.trim().length > 0 && /^[A-Za-zæøåÆØÅ\-]+$/.test(firstName))) {
				errors.firstName = 'Ugyldig fornavn';
			}
			if (!lastName || !(lastName.trim().length > 0 && /^[A-Za-zæøåÆØÅ\-]+$/.test(lastName))) {
				errors.lastName = 'Ugyldig etternavn';
			}
			if (!birthDate || !/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(birthDate)) {
				errors.dob = 'Ugyldig fødselsdato';
			}
			errors.firstname = 'Alle felter er påkrevd.';
			errors.lastname = 'Alle felter er påkrevd.';
			errors.dob = 'Alle felter er påkrevd.';
			return fail(400, { errors });
		}

		// Parse dd/mm/yyyy
		const [day, month, year] = birthDate.split('.');

		if (!day || !month || !year) {
			errors.dob = 'Ugyldig datoformat.';
			return fail(400, { errors });
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
				errors.result = 'Kunne ikke oppdatere bruker.';
				return fail(500, { errors });
			}
		} catch (err) {
			errors.result = 'Noe gikk galt';
			return fail(500, { errors });
		}
	},
};
