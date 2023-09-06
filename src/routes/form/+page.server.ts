import { client } from '$lib/db/mongo';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions = {
	createform: async ({ request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const now = new Date();

		try {
			await client.db('dynForms').collection('forms').insertOne({
				name: formData.formName,
				description: formData.formDescription,
				elements: [],
				createdAt: now,
				changedAt: now
			});
			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'error saving to db' });
		}
	}
};

export const load = (async () => {
	const result = client.db('dynForms').collection('forms').find();
	const forms = await result.toArray();
	// TODO why do I need to stringiy?
	return { forms: JSON.stringify(forms) };
}) satisfies PageServerLoad;
