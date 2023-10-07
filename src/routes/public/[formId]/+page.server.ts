import { client } from '$lib/db/mongo';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const actions = {
	result: async ({ request, params }) => {
		const data = await request.formData();
		const formRes = Object.fromEntries(data);

		// get form version
		try {
			const form = await client
				.db('dynForms')
				.collection('forms')
				.findOne({ _id: new ObjectId(params.formId) }, { projection: { version: 1 } });

			if (form) {
				try {
					await client
						.db('dynForms')
						.collection('results')
						.insertOne({
							formId: new ObjectId(params.formId),
							formVersion: form.version,
							...formRes
						});
				} catch (err) {
					console.error(err);
					return fail(500, { message: 'error saving to db' });
				}
			} else {
				return fail(404, { message: 'form data not found' });
			}
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'error saving to db' });
		}
	}
};

export const load = (async ({ params }) => {
	try {
		const publicForm = await client
			.db('dynForms')
			.collection('forms')
			.findOne({ _id: new ObjectId(params.formId) }, { projection: { _id: 0 } });

		if (publicForm && publicForm.public === false) {
			return { formId: params.formId };
		}
		return { formId: params.formId, form: publicForm };
	} catch (error) {
		console.error(error);
		return fail(500, { message: 'error fetching form db' });
	}
}) satisfies PageServerLoad;
