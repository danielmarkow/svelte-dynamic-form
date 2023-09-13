import { z } from 'zod';

export const selectFormElementSchema = z.object({
	id: z.string(),
	type: z.literal('select'),
	args: z.array(
		z.object({
			id: z.string(),
			optValue: z.string(),
			optLabel: z.string()
		})
	),
	name: z.string(),
	label: z.string()
});

export const newSelectSchema = z.object({
	label: z.string(),
	options: z.array(z.object({ id: z.string(), optValue: z.string(), optLabel: z.string() }))
});
