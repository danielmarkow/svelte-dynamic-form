import { error } from '@sveltejs/kit';
import { client } from '$lib/db/mongo';
import type { NewSelectData } from '$lib/types.js';
import { uniqueName } from '$lib/utils/apiHelpers.js';

import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';

// create new select element
export const POST = async ({ params, request }) => {
	// TODO validate
	const newSelect = (await request.json()) as NewSelectData;
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
};
