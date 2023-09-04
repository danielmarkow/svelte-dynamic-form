import { client } from '$lib/db/mongo';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		console.log(Object.fromEntries(data));
	},
	createinput: async ({ request }) => {
		const data = await request.formData();
		console.log('createinput: ', Object.fromEntries(data));
	}
};

export const load = (async ({ params }) => {
	const formId = params.formId;

	const result = await client
		.db('dynForms')
		.collection('forms')
		.findOne({ _id: new ObjectId(formId) }, { projection: { elements: 1 } });
	if (result === null) {
		return {};
	}

	return {
		form: result.elements
	};
}) satisfies PageServerLoad;
