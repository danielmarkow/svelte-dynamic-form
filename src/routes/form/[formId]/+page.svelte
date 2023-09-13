<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import type { FormElement } from '$lib/types';
	// import NewInput from '$lib/components/formelements/input/NewInput.svelte';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/formelements/input/Input.svelte';
	import NewElement from '$lib/components/formelements/NewElement.svelte';
	import Select from '$lib/components/formelements/select/Select.svelte';

	export let data: PageData;

	let formStructure: FormElement[] = data.form;
	$: formStructure = data.form;

	function deleteElement(elementId: string) {
		fetch(`/api/form/${data.formId}/${elementId}`, {
			method: 'DELETE'
		})
			.then(() => invalidateAll())
			.catch((err) => console.log(err));
	}
</script>

<form method="POST" action="?/create" use:enhance>
	<div class="flex flex-col gap-y-1 w-2/3">
		{#if formStructure.length === 0}
			<p>no form elements yet</p>
		{/if}
		{#each formStructure as el}
			{#if el.type === 'input'}
				<Input {el} {deleteElement} />
			{/if}
			{#if el.type === 'select'}
				<Select formId={data.formId} {el} {deleteElement} />
			{/if}
		{/each}
	</div>

	<!-- <button
		type="button"
		on:click={() => (showAdd = !showAdd)}
		class="px-5 mt-1 mb-1 rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>{showAdd ? '-' : '+'}</button
	>
	<br /> -->
	<!-- <hr class="w-2/3 mt-4 mb-2" />
	<button
		class="mt-1 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		formaction="?/create">Submit</button
	> -->
</form>
<!-- {#if showAdd === true} -->
<div class="h-2" />
<!-- <NewInput /> -->
<NewElement formId={data.formId} />
<!-- {/if} -->
