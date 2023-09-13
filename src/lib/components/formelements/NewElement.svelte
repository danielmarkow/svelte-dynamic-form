<script lang="ts">
	import NewInput from './input/NewInput.svelte';
	import NewSelect from './select/NewSelect.svelte';

	export let formId: string;

	let elementType = 'input';
</script>

<div class="md:w-2/3 w-full border border-dotted border-gray-400 p-1">
	<div class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
		<label for="elementTypeSelector" class="block text-xs font-medium text-gray-900">element type</label>
		<select id="elementTypeSelector" class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" bind:value={elementType}>
			<option value="input">new input</option>
			<option value="select">new select</option>
		</select>
	</div>
	<div>
		<div class="h-1" />
		{#if elementType === 'input'}
			<NewInput />
		{:else if elementType === 'select'}
			<NewSelect {formId} />
		{/if}
	</div>
</div>
