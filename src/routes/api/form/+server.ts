import { client } from '$lib/db/mongo';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const result = client
		.db('dynForms')
		.collection('forms')
		.find({}, { projection: { name: 1, description: 1, public: 1 } });
	const forms = await result.toArray();
	return json(forms);
};
