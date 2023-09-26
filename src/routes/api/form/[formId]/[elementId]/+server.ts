import { client } from '$lib/db/mongo.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

// delete form element
export const DELETE: RequestHandler = async ({ locals, params }) => {
	const userSession = await locals.getSession();
	const userEmail = userSession?.user?.email;
	const userEmailHash = crypto
		.createHash('sha256')
		.update(userEmail as string)
		.digest('base64');

	const form = await client
		.db('dynForms')
		.collection('forms')
		.findOne({ _id: new ObjectId(params.formId), userEmail: userEmailHash });

	if (form) {
		await client
			.db('dynForms')
			.collection('forms')
			.updateOne(
				{ _id: new ObjectId(params.formId), userEmail: userEmailHash },
				{ $pull: { elements: { id: params.elementId } } }
			);
		return new Response(null, { status: 204 });
	} else {
		throw error(404, { message: 'form not found' });
	}
};
