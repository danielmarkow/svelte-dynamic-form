import type { z } from 'zod';
import type { newSelectSchema, selectFormElementSchema } from './validation/zodSchemata';

export type FormElement =
	| {
			id: string;
			type: 'input';
			args: string;
			name: string;
			label: string;
			required: boolean;
	  }
	| {
			id: string;
			type: 'select';
			args: { id: string; optValue: string; optLabel: string }[];
			name: string;
			label: string;
	  };

export type InputFormElement = {
	id: string;
	type: 'input';
	args: string;
	name: string;
	label: string;
	required: boolean;
};

export type SelectFormElement = z.infer<typeof selectFormElementSchema>;

export type SelectOptionFormElement = { id: string; optValue: string; optLabel: string };

// when generating a new select element this is the input
export type NewSelectData = z.infer<typeof newSelectSchema>;
