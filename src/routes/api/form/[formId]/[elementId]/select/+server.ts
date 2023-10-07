import { client } from '$lib/db/mongo.js';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import { selectFormElementSchema } from '$lib/validation/zodSchemata.js';
import { uniqueName } from '$lib/utils/apiHelpers.js';
import crypto from 'crypto';

// modify select element
export const PUT = async ({ locals, params, request }) => {
	const userSession = await locals.getSession();
	const userEmail = userSession?.user?.email;
	const userEmailHash = crypto
		.createHash('sha256')
		.update(userEmail as string)
		.digest('base64');

	try {
		const modifiedElement = selectFormElementSchema.parse(await request.json());
		try {
			// is this atomic?
			await client
				.db('dynForms')
				.collection('forms')
				.updateOne(
					{
						_id: new ObjectId(params.formId),
						'elements.id': modifiedElement.id,
						userEmail: userEmailHash
					},
					{
						$set: {
							'elements.$.args': modifiedElement.args,
							changedAt: new Date(),
							'elements.$.label': modifiedElement.label,
							'elements.$.name': uniqueName(modifiedElement.label)
						},
						$inc: {
							version: 1
						}
					}
				);
			return new Response(null, { status: 204 });
		} catch (err) {
			throw error(500, { message: 'could not update db' });
		}
	} catch (err) {
		throw error(400, { message: 'validation error' });
	}
};
