import { client } from '$lib/db/mongo';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import crypto from 'crypto';

export const GET: RequestHandler = async ({ locals }) => {
	const userSession = await locals.getSession();
	const userEmail = userSession?.user?.email;
	const userEmailHash = crypto
		.createHash('sha256')
		.update(userEmail as string)
		.digest('base64');

	const result = client
		.db('dynForms')
		.collection('forms')
		.find({ userEmail: userEmailHash }, { projection: { name: 1, description: 1, public: 1 } });
	const forms = await result.toArray();
	return json(forms);
};
