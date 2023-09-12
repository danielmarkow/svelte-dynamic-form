import { nanoid } from 'nanoid';

export function uniqueName(label: string) {
	return label.toString().toLowerCase().replaceAll(' ', '_') + '_' + nanoid(5);
}
