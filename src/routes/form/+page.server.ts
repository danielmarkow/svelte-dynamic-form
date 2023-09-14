import { client } from '$lib/db/mongo';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';

export const actions = {
	createform: async ({ request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const now = new Date();

		try {
			await client
				.db('dynForms')
				.collection('forms')
				.insertOne({
					name: formData.formName,
					description: formData.formDescription,
					elements: [],
					public: formData.public === 'false' ? false : true,
					createdAt: now,
					changedAt: now
				});
			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'error saving to db' });
		}
	},
	deleteform: async ({ request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		try {
			await client
				.db('dynForms')
				.collection('forms')
				.deleteOne({ _id: new ObjectId(formData.formId as string) });
			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'error deleting document' });
		}
	}
};

export const load = (async () => {
	const result = client.db('dynForms').collection('forms').find();
	const forms = await result.toArray();
	// TODO why do I need to stringify?
	return { forms: JSON.stringify(forms) };
}) satisfies PageServerLoad;
