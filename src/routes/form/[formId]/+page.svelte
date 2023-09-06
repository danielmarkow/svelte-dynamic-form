<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { FormElement } from '$lib/types';
	import NewInput from '$lib/components/NewInput.svelte';
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	let showAdd = true;

	let formStructure: FormElement[] = data.form;
	$: formStructure = data.form;

	function deleteElement(elementId: string) {
		fetch(`/api/form/${data.formId}/${elementId}`, {
			method: 'DELETE'
		})
			.then(() => invalidate(`/form/${data.formId}`))
			.catch((err) => console.log(err));
	}
</script>

<form method="POST" action="?/create" use:enhance>
	<div class="flex flex-col gap-y-1 w-2/3">
		{#each formStructure as el}
			{#if el.type === 'input'}
				{@html `
                <label for=${el.id}>${el.label}</label>
                <${el.type} id=${el.id} type=${el.args} name=${el.name} ${
					el.required ? 'required' : ''
				}/>
            `}
			{/if}
			{#if el.type === 'select'}
				{@html `
                    <label for=${el.id}>${el.label}</label>
                    <select id=${el.id} name=${el.name}>
                        ${el.args.map(
													(opt) => `<option value=${opt.optValue}>${opt.optLabel}</option>`
												)}
                    </select>
                `}
			{/if}
			<button
				type="button"
				on:click={() => deleteElement(el.id)}
				>delete</button
			>
		{/each}
	</div>

	<button
		type="button"
		on:click={() => (showAdd = !showAdd)}
		class="px-5 mt-1 mb-1 rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>{showAdd ? '-' : '+'}</button
	>
	<br />
	<hr class="w-2/3" />
	<button
		class="mt-1 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		formaction="?/create">Submit</button
	>
</form>
{#if showAdd === true}
	<div class="h-2" />
	<NewInput />
{/if}
