<script lang="ts">
	import { nanoid } from 'nanoid';
	import type { NewSelectData } from '$lib/types';
	import type { PageData } from '../../../../routes/$types';
	import { invalidateAll } from '$app/navigation';

	let formData: NewSelectData = {
		label: '',
		options: [{ id: nanoid(), optValue: '', optLabel: '' }, { id: nanoid(), optValue: '', optLabel: '' }]
	};

	function appendOption() {
		formData.options = [...formData.options, { id: nanoid(), optValue: '', optLabel: '' }];
	}
	export let formId: string;

	function submitNewSelect() {
		fetch(`/api/form/${formId}/select`, {
			method: 'POST',
			body: JSON.stringify(formData)
		})
			.then(() => {
				formData = {
					label: '',
					options: [{ id: nanoid(), optValue: '', optLabel: '' }]
				};
        invalidateAll()
			})
			.catch((err) => console.error('an error occured saving the new select: ', err));
	}
</script>

<div class="flex flex-col gap-y-1">
	<div class="flex flex-col">
		<label for="selectLabel">Label</label>
		<input type="text" id="selectLabel" name="selectLabel" required bind:value={formData.label} />
	</div>
	<p class="mt-2">Options</p>
	{#each formData.options as _option, index}
		<div class="flex flex-col">
			<label for="optLabel">{index + 1}. Option Label</label>
			<input type="text" required bind:value={formData.options[index].optLabel} />
		</div>
		<div class="flex flex-col">
			<label for="optValue">{index + 1}. Option Value</label>
			<input type="text" required bind:value={formData.options[index].optValue} />
		</div>
	{/each}
</div>
<button
	class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
	on:click={() => submitNewSelect()}>save</button
>
<button
	class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
	type="button"
	on:click={() => appendOption()}>add option</button
>
