import { db } from '$lib/db/conn.server.js';
import { FormElementsTable, insertFormElementsSchema } from '$lib/db/schema.js';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET({ params }) {
	const formId = params.formId;
	if (formId) {
		const elements = await db
			.select()
			.from(FormElementsTable)
			.where(eq(FormElementsTable.formId, formId));
		return json(elements);
	}
	throw error(400, 'no form id provided');
}

export async function POST({ params, request }) {
	const formId = params.formId;
	const req = await request.json();
	const now = new Date();
	if (formId) {
		const newElement = insertFormElementsSchema.parse(req);
		const ret = await db
			.insert(FormElementsTable)
			.values({ ...newElement, id: nanoid(), createdAt: now, changedAt: now })
			.returning();
		return json(ret);
	}
	throw error(400, 'no form id provided');
}
