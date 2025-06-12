import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { COOKIE_KEYS } from '$lib/cookies';

interface Home {
	id: string;
	meterId: string;
	street: string;
	streetNumber: string;
	postalCode: string;
	city: string;
}
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const requiredFields: (keyof Home)[] = ['street', 'streetNumber', 'postalCode', 'city'] as const;

async function fetchAdresses(cookies: import('@sveltejs/kit').Cookies): Promise<Home[] | null> {
	const bearerToken = cookies.get(COOKIE_KEYS.bearerToken);

	if (!bearerToken) {
		return null;
	}

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

	try {
		const res = await fetch(PUBLIC_API_BASE_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearerToken}`,
			},
			body: JSON.stringify({ query }),
		});

		if (!res.ok) return null;

		const json = await res.json();

		if (json.errors) return null;

		const homes = json.data?.user?.homes;

		if (!Array.isArray(homes)) return null;

		return homes;
	} catch (error) {
		return null;
	}
}

export async function GET({ cookies }: { cookies: import('@sveltejs/kit').Cookies }) {
	const maxAttempts = 20;

	for (let i = 0; i < maxAttempts; i++) {
		const homes = await fetchAdresses(cookies);

		if (homes && homes.length > 0) {
			const allValid = homes.every((home) =>
				requiredFields.every(
					(field) => typeof home[field] === 'string' && home[field].trim() !== ''
				)
			);
			if (!allValid) {
				continue;
			}
		}
		if (homes) {
			return json({ status: 'success', data: homes });
		}
		await delay(1000);
	}

	return json({ status: 'timeout' }, { status: 408 });
}
