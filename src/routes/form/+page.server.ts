import { client } from '$lib/db/mongo';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import crypto from 'crypto';

export const actions = {
	createform: async ({ locals, request }) => {
		const userSession = await locals.getSession();
		const userEmail = userSession?.user?.email;
		const userEmailHash = crypto
			.createHash('sha256')
			.update(userEmail as string)
			.digest('base64');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const now = new Date();

		try {
			await client.db('dynForms').collection('forms').insertOne({
				name: formData.formName,
				description: formData.formDescription,
				elements: [],
				public: false,
				userEmail: userEmailHash,
				version: 1,
				createdAt: now,
				changedAt: now
			});
			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'error saving to db' });
		}
	},
	togglepublic: async ({ locals, request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const userSession = await locals.getSession();
		const userEmail = userSession?.user?.email;
		const userEmailHash = crypto
			.createHash('sha256')
			.update(userEmail as string)
			.digest('base64');

		const now = new Date();

		try {
			const formToUpdate = await client
				.db('dynForms')
				.collection('forms')
				.findOne({ _id: new ObjectId(formData.formId as string), userEmail: userEmailHash });

			try {
				if (formToUpdate && formToUpdate.public === true) {
					await client
						.db('dynForms')
						.collection('forms')
						.updateOne(
							{ _id: new ObjectId(formData.formId as string), userEmail: userEmailHash },
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
							{ _id: new ObjectId(formData.formId as string), userEmail: userEmailHash },
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
	deleteform: async ({ locals, request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const userSession = await locals.getSession();
		const userEmail = userSession?.user?.email;
		const userEmailHash = crypto
			.createHash('sha256')
			.update(userEmail as string)
			.digest('base64');

		try {
			await client
				.db('dynForms')
				.collection('forms')
				.deleteOne({ _id: new ObjectId(formData.formId as string), userEmail: userEmailHash });
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
