import { client } from '$lib/db/mongo.js';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import { selectFormElementSchema } from '$lib/validation/zodSchemata.js';
import { uniqueName } from '$lib/utils/apiHelpers.js';

// modify select element
export const PUT = async ({ params, request }) => {
	try {
		const modifiedElement = selectFormElementSchema.parse(await request.json());
		try {
			// is this atomic?
			await client
				.db('dynForms')
				.collection('forms')
				.updateOne(
					{ _id: new ObjectId(params.formId), 'elements.id': modifiedElement.id },
					{
						$set: {
							'elements.$.args': modifiedElement.args,
							changedAt: new Date(),
							'elements.$.label': modifiedElement.label,
							'elements.$.name': uniqueName(modifiedElement.label)
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
