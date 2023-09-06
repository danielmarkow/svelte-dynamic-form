import { client } from '$lib/db/mongo';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import { nanoid } from 'nanoid';
import { fail } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		console.log(Object.fromEntries(data));
	},
	createinput: async ({ params, request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const newId = nanoid();
		const now = new Date();

		console.log('createinput: ', Object.fromEntries(data));
		console.log('formId: ', params.formId);

		try {
			await client
				.db('dynForms')
				.collection('forms')
				.updateOne(
					{ _id: new ObjectId(params.formId) },
					{
						$push: {
							elements: {
								id: newId,
								type: 'input',
								args: formData.inputArg,
								name: formData.labelInput.toString().toLowerCase() + '_' + nanoid(5),
								label: formData.labelInput,
								required: formData.requiredArg
							}
						},
						$set: {
							changedAt: now
						}
					}
				);
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'error saving to db' });
		}
	}
};

export const load = (async ({ params }) => {
	const formId = params.formId;

	const result = await client
		.db('dynForms')
		.collection('forms')
		.findOne({ _id: new ObjectId(formId) }, { projection: { elements: 1 } });
	if (result === null) {
		return { formId };
	}

	return {
		formId,
		form: result.elements
	};
}) satisfies PageServerLoad;
