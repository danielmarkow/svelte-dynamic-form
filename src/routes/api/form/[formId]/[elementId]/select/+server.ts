import { client } from '$lib/db/mongo.js';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import type { SelectFormElement } from '$lib/types.js';

// modify select element
export const PUT = async ({ params, request }) => {
	// TODO validate
	// is this atomic?
	const modifiedElement = (await request.json()) as SelectFormElement;
	try {
		await client
			.db('dynForms')
			.collection('forms')
			.updateOne(
				{ _id: new ObjectId(params.formId), 'elements.id': modifiedElement.id },
				{
					$set: {
						'elements.$.args': modifiedElement.args
					}
				}
			);
		return new Response(null, { status: 204 });
	} catch (err) {
		throw error(500, { message: 'could not update db' });
	}
};
