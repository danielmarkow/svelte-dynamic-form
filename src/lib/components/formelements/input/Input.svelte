<script lang="ts">
	import type { InputFormElement } from '$lib/types';
	import EditInput from './EditInput.svelte';

	export let el: InputFormElement;
	export let deleteElement: (elementId: string) => void;

	let showEdit = false;
</script>

{#if showEdit}
	<EditInput
		oldLabel={el.label}
		oldInputType={el.args}
		oldRequired={el.required}
		elId={el.id}
		on:notify={() => {
			showEdit = !showEdit;
		}}
	/>
{:else}
	<div id={el.id} class="flex flex-col w-2/3">
		<label for={el.id}>{el.label}</label>
		<input id={el.id} type={el.args} name={el.name} required={el.required || null} />
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
