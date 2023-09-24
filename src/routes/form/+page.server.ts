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
			await client.db('dynForms').collection('forms').insertOne({
				name: formData.formName,
				description: formData.formDescription,
				elements: [],
				public: false,
				createdAt: now,
				changedAt: now
			});
			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'error saving to db' });
		}
	},
	togglepublic: async ({ request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const now = new Date();

		try {
			const formToUpdate = await client
				.db('dynForms')
				.collection('forms')
				.findOne({ _id: new ObjectId(formData.formId as string) });

			try {
				if (formToUpdate && formToUpdate.public === true) {
					await client
						.db('dynForms')
						.collection('forms')
						.updateOne(
							{ _id: new ObjectId(formData.formId as string) },
							{
								$set: {
									public: false,
									changedAt: now
								}
							}
						);
				}

				if (formToUpdate && formToUpdate.public === false) {
					await client
						.db('dynForms')
						.collection('forms')
						.updateOne(
							{ _id: new ObjectId(formData.formId as string) },
							{
								$set: {
									public: true,
									changedAt: now
								}
							}
						);
				}
			} catch (error) {
				console.error(error);
				return fail(500, { message: 'error updating form' });
			}
		} catch (error) {
			console.error(error);
			return fail(404, { message: 'form not found' });
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
	return {};
}) satisfies PageServerLoad;
