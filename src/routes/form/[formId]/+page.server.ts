import { client } from '$lib/db/mongo';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import { nanoid } from 'nanoid';
import { fail } from '@sveltejs/kit';

function uniqueName(label: string) {
	return label.toString().toLowerCase().replaceAll(' ', '_') + '_' + nanoid(5);
}

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
								name: uniqueName(formData.labelInput as string),
								label: formData.labelInput,
								required: formData.requiredArg === 'true' ? true : false
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
	},
	editinput: async ({ params, request }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		try {
			await client
				.db('dynForms')
				.collection('forms')
				.updateOne(
					{ _id: new ObjectId(params.formId), 'elements.id': formData.elId },
					{
						$set: {
							'elements.$.args': formData.inputArg,
							'elements.$.name': uniqueName(formData.labelInput as string),
							'elements.$.label': formData.labelInput,
							'elements.$.required': formData.requiredArg === 'true' ? true : false
						}
					}
				);
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'error updating db' });
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
