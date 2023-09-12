import { z } from 'zod';

export const newSelectSchema = z.object({
	label: z.string(),
	options: z.array(z.object({ id: z.string(), optValue: z.string(), optLabel: z.string() }))
});
