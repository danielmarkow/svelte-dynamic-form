import { client } from '$lib/db/mongo';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const publicForm = await client
		.db('dynForms')
		.collection('forms')
		.findOne({ _id: new ObjectId(params.formId) }, { projection: { _id: 0 } });

	if (publicForm && publicForm.public === false) {
		return { formId: params.formId };
	}
	return { formId: params.formId, form: publicForm };
}) satisfies PageServerLoad;
