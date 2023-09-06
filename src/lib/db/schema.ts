import { varchar, timestamp, text, pgTable, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const FormTable = pgTable('form', {
	id: varchar('form_id', { length: 21 }).notNull().primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	createdAt: timestamp('created_at').notNull(),
	changedAt: timestamp('changed_at').notNull()
});

export const insertFormSchema = createInsertSchema(FormTable, {
	name: z.string().min(1)
}).omit({
	id: true,
	createdAt: true,
	changedAt: true
});

export const selectFormSchema = createSelectSchema(FormTable);

export const FormElementsTable = pgTable('form_elements', {
	id: varchar('element_id', { length: 21 }).notNull().primaryKey(),
	formId: text('form_id')
		.notNull()
		.references(() => FormTable.id),
	userId: text('user_id').notNull(),
	type: text('type').notNull(),
	args: text('args'),
	name: text('name').notNull(),
	label: text('label'),
	required: boolean('required'),
	createdAt: timestamp('created_at').notNull(),
	changedAt: timestamp('changed_at').notNull()
});

export const insertFormElementsSchema = createInsertSchema(FormElementsTable, {
	type: z.string().min(1),
	name: z.string().min(1)
}).omit({
	id: true,
	createdAt: true,
	changedAt: true
});
export const selectFormElementsSchema = createSelectSchema(FormElementsTable);
