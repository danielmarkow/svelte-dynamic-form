<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { FormElement } from '$lib/types';
	import NewInput from '$lib/components/NewInput.svelte';
	import { invalidate } from '$app/navigation';
	import EditInput from '$lib/components/EditInput.svelte';

	export let data: PageData;

	// let showAdd = true;

	let formStructure: FormElement[] = data.form;
	$: formStructure = data.form;

	function deleteElement(elementId: string) {
		fetch(`/api/form/${data.formId}/${elementId}`, {
			method: 'DELETE'
		})
			.then(() => invalidate(`/form/${data.formId}`))
			.catch((err) => console.log(err));
	}

	function createEditInput({id, oldLabel, oldInputType, oldRequired} : {id: string, oldLabel: string, oldInputType: string, oldRequired: boolean}) {
		console.log({oldLabel, oldInputType, oldRequired})
		// new EditInput({target: document.querySelector(id)!, options: {oldLabel, oldInputType, oldRequired}})
	}
</script>

<form method="POST" action="?/create" use:enhance>
	<div class="flex flex-col gap-y-1 w-2/3">
		{#each formStructure as el}
			{#if el.type === 'input'}
			<div id={el.id} class="flex flex-col w-2/3">
				<label for={el.id}>{el.label}</label>
				<input id={el.id} type={el.args} name={el.name} required={el.required || null} />
				<!-- <EditInput oldLabel={el.label} oldInputType={el.args} oldRequired={el.required} /> -->
			</div>
			{/if}
			{#if el.type === 'select'}
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
				<button type="button" on:click={() => deleteElement(el.id)}>delete</button>
				<button type="button">edit</button>
			</div>
		{/each}
	</div>

	<!-- <button
		type="button"
		on:click={() => (showAdd = !showAdd)}
		class="px-5 mt-1 mb-1 rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>{showAdd ? '-' : '+'}</button
	>
	<br /> -->
	<hr class="w-2/3 mt-4 mb-2" />
	<button
		class="mt-1 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		formaction="?/create">Submit</button
	>
</form>
<!-- {#if showAdd === true} -->
<div class="h-2" />
<NewInput />
<!-- {/if} -->
