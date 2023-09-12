import { client } from '$lib/db/mongo.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { RequestHandler } from './$types';

// delete form element
export const DELETE: RequestHandler = async ({ params }) => {
	const form = await client
		.db('dynForms')
		.collection('forms')
		.findOne({ _id: new ObjectId(params.formId) });

	if (form) {
		await client
			.db('dynForms')
			.collection('forms')
			.updateOne(
				{ _id: new ObjectId(params.formId) },
				{ $pull: { elements: { id: params.elementId } } }
			);
		return new Response(null, { status: 204 });
	} else {
		throw error(404, { message: 'form not found' });
	}
};
