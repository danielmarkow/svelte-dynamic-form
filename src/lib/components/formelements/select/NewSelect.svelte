<script lang="ts">
	import { nanoid } from 'nanoid';
	import type { NewSelectData } from '$lib/types';
	import { invalidateAll } from '$app/navigation';
	import { newSelectSchema } from '$lib/validation/zodSchemata';

	export let formId: string;

	let formData: NewSelectData = {
		label: '',
		options: [
			{ id: nanoid(), optValue: '', optLabel: '' },
			{ id: nanoid(), optValue: '', optLabel: '' }
		]
	};

	function appendOption() {
		formData.options = [...formData.options, { id: nanoid(), optValue: '', optLabel: '' }];
	}

	function submitNewSelect() {
		try {
			const newSelect = newSelectSchema.parse(formData);
			fetch(`/api/form/${formId}/select`, {
				method: 'POST',
				body: JSON.stringify(newSelect)
			})
				.then(() => {
					formData = {
						label: '',
						options: [{ id: nanoid(), optValue: '', optLabel: '' }]
					};
					invalidateAll();
				})
				.catch((err) => console.error('an error occured saving the new select: ', err));
		} catch (error) {
			console.error('form data validation failed');
		}
	}
</script>

<div class="flex flex-col gap-y-1">
	<div
		class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
	>
		<label class="block text-xs font-medium text-gray-900" for="selectLabel">Label</label>
		<input
			class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
			type="text"
			id="selectLabel"
			name="selectLabel"
			required
			bind:value={formData.label}
		/>
	</div>
	<div class="h-2" />
	<p>Options</p>
	{#each formData.options as _option, index}
		<div
			class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
		>
			<label class="block text-xs font-medium text-gray-900" for="optLabel"
				>{index + 1}. Option Label</label
			>
			<input
				class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				type="text"
				required
				bind:value={formData.options[index].optLabel}
			/>
		</div>
		<div
			class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
		>
			<label class="block text-xs font-medium text-gray-900" for="optValue"
				>{index + 1}. Option Value</label
			>
			<input
				class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				type="text"
				required
				bind:value={formData.options[index].optValue}
			/>
		</div>
		<div class="h-1" />
	{/each}
</div>
<div class="h-1" />
<button
	class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
	on:click={() => submitNewSelect()}>save</button
>
<button
	class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
	type="button"
	on:click={() => appendOption()}>add option</button
>
