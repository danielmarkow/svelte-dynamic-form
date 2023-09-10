import { client } from '$lib/db/mongo.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const formToDelete = await client
		.db('dynForms')
		.collection('forms')
		.findOne({ _id: new ObjectId(params.formId) });

	if (formToDelete) {
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
