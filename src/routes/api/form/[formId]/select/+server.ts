import { error } from '@sveltejs/kit';
import { client } from '$lib/db/mongo';
import { uniqueName } from '$lib/utils/apiHelpers.js';

import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';
import { newSelectSchema } from '$lib/validation/zodSchemata.js';

// create new select element
export const POST = async ({ params, request }) => {
	try {
		const newSelect = newSelectSchema.parse(await request.json());
		try {
			await client
				.db('dynForms')
				.collection('forms')
				.updateOne(
					{ _id: new ObjectId(params.formId) },
					{
						$push: {
							elements: {
								id: nanoid(),
								type: 'select',
								args: newSelect.options,
								name: uniqueName(newSelect.label),
								label: newSelect.label,
								required: true
							}
						},
						$set: {
							changedAt: new Date()
						}
					}
				);
			return new Response(null, { status: 204 });
		} catch (err) {
			throw error(500, { message: 'could not write to db' });
		}
	} catch (err) {
		throw error(400, { message: 'validation error' });
	}
};
