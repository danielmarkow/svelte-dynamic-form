<script lang="ts">
	import type { PageData } from './$types';
	import type { FormElement } from '$lib/types';
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

<div class="h-4" />
{#if Object.keys(data).includes('formName')}
	<h1 class="text-xl">{data.formName}</h1>
	<p>{data.formDescription}</p>
	<div class="h-4" />
	<form>
		<div class="flex flex-col gap-y-1 md:w-2/3 w-full">
			{#if formStructure.length === 0}
				<p class="italic">no form elements yet</p>
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
	</form>
	<div class="h-10" />
	<NewElement formId={data.formId} />
{:else}
	<p class="text-sm">this form doesn't belong to you</p>
{/if}
