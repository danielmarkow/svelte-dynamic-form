<script lang="ts">
	import type { SelectFormElement } from '$lib/types';
	import EditSelect from './EditSelect.svelte';

	export let formId: string;
	export let el: SelectFormElement;
	export let deleteElement: (elementId: string) => void;

	let showEdit = false;
</script>

{#if showEdit}
	<div class="border border-dotted border-gray-400 p-0.5">
		<EditSelect
			{el}
			{formId}
			on:notify={() => {
				showEdit = !showEdit;
			}}
		/>
	</div>
{:else}
	<div id={el.id} class="flex flex-col gap-y-1 w-2/3">
		<label for={el.id}>{el.label}</label>
		<select id={el.id} name={el.name}>
			{#each el.args as opt}
				<option value={opt.optValue}>{opt.optLabel}</option>
			{/each}
		</select>
	</div>
{/if}

<div class="flex gap-2">
	{#if showEdit === false}
		<button
			class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			type="button"
			on:click={() => deleteElement(el.id)}>delete</button
		>
		<button
			class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			type="button"
			on:click={() => {
				showEdit = !showEdit;
			}}>edit</button
		>
	{:else}
		<button
			class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			type="button"
			on:click={() => (showEdit = !showEdit)}>abort</button
		>
	{/if}
</div>
