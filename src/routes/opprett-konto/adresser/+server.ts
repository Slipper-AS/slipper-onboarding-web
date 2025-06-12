import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

async function fetchAdresses(cookies: import('@sveltejs/kit').Cookies): Promise<any | null> {
	const bearerToken = cookies.get('bearer_token');

	const query = `
		query MyQuery {
			user {
				homes{
                    id
                    meterId
                    street
                    streetNumber
                    postalCode
                    city
                }
			}
		}
	`;

	const res = await fetch(PUBLIC_API_BASE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${bearerToken}`,
		},
		body: JSON.stringify({ query }),
	});

	if (!res.ok) return null;

	const { data } = await res.json();
	return data?.user?.homes || null;
}

export async function GET({ cookies }: { cookies: import('@sveltejs/kit').Cookies }) {
	const maxAttempts = 20;
	const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

	for (let i = 0; i < maxAttempts; i++) {
		const result = await fetchAdresses(cookies);
		if (Array.isArray(result) && result.length > 0) {
			const requiredFields = ['street', 'streetNumber', 'postalCode', 'city'];
			const allValid = result.every((home) =>
				requiredFields.every(
					(field) => typeof home[field] === 'string' && home[field].trim() !== ''
				)
			);
			if (!allValid) {
				continue;
			}
		}
		if (result) {
			return json({ status: 'success', data: result });
		}
		await delay(1000);
	}

	return json({ status: 'timeout' }, { status: 408 });
}
