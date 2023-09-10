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
			args: { optValue: string; optLabel: string }[];
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
