import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return { formId: params.formId };
}) satisfies PageServerLoad;
