import type { RequestHandler } from './$types';
import crypto from 'crypto';

import { client } from '$lib/db/mongo';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const userSession = await locals.getSession();
	const userEmail = userSession?.user?.email;
	const userEmailHash = crypto
		.createHash('sha256')
		.update(userEmail as string)
		.digest('base64');

	// TODO filter for user email
	// TODO labels?
	const res = await client
		.db('dynForms')
		.collection('forms')
		.aggregate([
			{
				$lookup: {
					from: 'results',
					pipeline: [{ $project: { _id: 0, formId: 0 } }],
					localField: '_id',
					foreignField: 'formId',
					as: 'results'
				}
			},
			{
				$project: {
					elements: 0,
					userEmail: 0,
					createdAt: 0,
					changedAt: 0
				}
			}
		])
		.toArray();

	return json(res);
};
