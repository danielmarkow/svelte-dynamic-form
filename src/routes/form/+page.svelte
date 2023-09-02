<script lang="ts">
	import { enhance } from '$app/forms';
	import { nanoid } from 'nanoid';
	// import type { PageData } from './$types';

	// export let data: PageData;

	let showAdd = true;
	let nameInput = '';
	let labelInput = '';
	let argInput = 'text';
	let requiredInput = false;

	type FormElement = {
		id: string;
		type: "input";
		args: string;
		name: string;
		label: string;
		required: boolean;
	} | {
		id: string;
		type: "select";
		args: {optValue: string; optLabel: string;}[],
		name: string;
		label: string;
	}

	let formStructure: FormElement[] = [
		{
			id: '1',
			type: 'input' as const,
			args: 'text',
			name: 'firstName',
			label: 'First Name',
			required: true
		},
		{
			id: '2',
			type: 'input' as const,
			args: 'text',
			name: 'lastName',
			label: 'Last Name',
			required: false
		},
		{
			id: '3',
			type: 'input' as const,
			args: 'text',
			name: 'street',
			label: 'Street',
			required: false
		},
		{
			id: '4',
			type: 'select' as const,
			args: [
				{ optValue: 'yes', optLabel: 'Yes' },
				{ optValue: 'no', optLabel: 'No' }
			],
			name: 'vote',
			label: 'Vote please!'
		}
	];

	function addInput() {
		formStructure = [
			...formStructure,
			{
				id: nanoid(),
				type: 'input',
				args: argInput,
				name: nameInput,
				label: labelInput,
                required: requiredInput
			}
		];
		nameInput = '';
		labelInput = '';
		argInput = '';
        requiredInput = false;
	}
</script>

<form method="POST" action="?/create" use:enhance>
	<div class="flex flex-col gap-y-1 w-2/3">
		{#each formStructure as el}
			{#if el.type === 'input'}
				{@html `
                <label for=${el.id}>${el.label}</label>
                <${el.type} id=${el.id} type=${el.args} name=${el.name} ${el.required ? 'required' : ''}/>
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
		{/each}
	</div>
	{#if showAdd === true}
		<form class="mt-1">
			<div class="flex flex-col gap-y-1 w-2/3 border border-dashed border-gray-300 p-1">
				<h2 class="text-xl">new input</h2>
				<div class="flex flex-col">
					<label for="nameInput">Name</label>
					<input id="nameInput" type="text" bind:value={nameInput} />
				</div>
				<div class="flex flex-col">
					<label for="labelInput">Label</label>
					<input id="labelInput" type="text" bind:value={labelInput} />
				</div>
				<div class="flex flex-col">
					<label for="inputArg">Input Type</label>
					<select id="inputArg" bind:value={argInput}>
						<option value="text">Text</option>
						<option value="number">Number</option>
						<option value="email">Email</option>
						<option value="url">Url</option>
					</select>
				</div>
				<div class="flex flex-col">
                    <label for="requiredArg">Required?</label>
                    <select id="requiredArg" bind:value={requiredInput}>
                        <option value={false}>Not Required</option>
                        <option value={true}>Required!</option>
                    </select>
                </div>
				<button
					type="button"
					class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					on:click={addInput}>Add Input</button
				>
			</div>
		</form>
	{/if}
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
		>Submit</button
	>
</form>
