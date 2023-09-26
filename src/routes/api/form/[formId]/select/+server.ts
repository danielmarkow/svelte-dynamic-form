import { error } from '@sveltejs/kit';
import { client } from '$lib/db/mongo';
import { uniqueName } from '$lib/utils/apiHelpers.js';
import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';
import crypto from 'crypto';

import { newSelectSchema } from '$lib/validation/zodSchemata.js';

// create new select element
export const POST = async ({ locals, params, request }) => {
	const userSession = await locals.getSession();
	const userEmail = userSession?.user?.email;
	const userEmailHash = crypto
		.createHash('sha256')
		.update(userEmail as string)
		.digest('base64');

	try {
		const newSelect = newSelectSchema.parse(await request.json());
		try {
			await client
				.db('dynForms')
				.collection('forms')
				.updateOne(
					{ _id: new ObjectId(params.formId), userEmail: userEmailHash },
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
