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

export type SelectFormElement = {
	id: string;
	type: 'select';
	args: SelectOptionFormElement[];
	name: string;
	label: string;
};

export type SelectOptionFormElement = { id: string; optValue: string; optLabel: string };

export type NewSelectData = {
	label: string;
	options: { id: string; optValue: string; optLabel: string }[];
};
