import { db } from '$lib/db/conn.server.js';
import { FormTable, insertFormSchema } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

export async function POST({ request }) {
	const req = await request.json();
	const now = new Date();
	const newForm = insertFormSchema.parse(req);
	const ret = await db
		.insert(FormTable)
		.values({ id: nanoid(), changedAt: now, createdAt: now, ...newForm })
		.returning();
	return json(ret);
}
