<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { SelectFormElement } from '$lib/types';
	import { selectFormElementSchema } from '$lib/validation/zodSchemata';
	import { nanoid } from 'nanoid';
	import { createEventDispatcher } from 'svelte';

	export let formId: string;
	export let el: SelectFormElement;

	const dispatch = createEventDispatcher();

	function appendOption() {
		el.args = [...el.args, { id: nanoid(), optValue: '', optLabel: '' }];
	}

	function deleteOption(id: string) {
		el.args = [...el.args.filter((el) => el.id !== id)];
	}

	function submitModifiedSelect() {
		try {
			const modifiedSelect = selectFormElementSchema.parse(el);

			fetch(`/api/form/${formId}/${el.id}/select`, {
				method: 'PUT',
				body: JSON.stringify(modifiedSelect)
			})
				.then(() => {
					dispatch('notify', 'edit successfull');
					invalidateAll();
				})
				.catch((err) => console.error('an error occurred updating the select element: ', err));
		} catch (err) {
			console.error('validation error');
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
			bind:value={el.label}
		/>
	</div>
	<p class="mt-2">Options</p>
	{#each el.args as option, index}
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
				bind:value={el.args[index].optLabel}
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
				bind:value={el.args[index].optValue}
			/>
		</div>
		<button
			class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			type="button"
			on:click={() => deleteOption(option.id)}>delete</button
		>
		<div class="h-2" />
	{/each}
</div>
<button
	class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
	type="button"
	on:click={() => appendOption()}>add option</button
>
<button
	class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
	type="button"
	on:click={() => submitModifiedSelect()}>save</button
>
