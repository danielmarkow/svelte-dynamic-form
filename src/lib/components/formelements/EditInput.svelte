<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let elId: string;
	export let oldLabel: string;
	export let oldInputType: string;
	export let oldRequired: boolean;
</script>

<form method="POST" action="?/editinput" use:enhance={({ }) => {
	return async ({ result }) => {
		if (result.type === "success") {
			dispatch("notitfy", "edit successfull")
		}
	};
}}>
	<div class="flex flex-col gap-y-1 w-2/3 border border-dashed border-gray-300 p-1">
		<h2 class="text-xl">edit input</h2>
		<input type="text" id="elId" name="elId" value={elId} hidden />
		<div class="flex flex-col">
			<label for="labelInput">Label</label>
			<input id="labelInput" name="labelInput" type="text" value={oldLabel} required />
		</div>
		<div class="flex flex-col">
			<label for="inputArg">Input Type</label>

				<select id="inputArg" name="inputArg">
				<option value="text" selected={oldInputType === 'text' ? true : false}>Text</option>
				<option value="number" selected={oldInputType === 'number' ? true : false}>Number</option>
				<option value="email" selected={oldInputType === 'email' ? true : false}>Email</option>
				<option value="url" selected={oldInputType === 'url' ? true : false}>Url</option>
				<option value="date" selected={oldInputType === 'date' ? true : false}>Date</option>
				<option value="datetime-local" selected={
					oldInputType === 'datetime-local' ? true : false
				}>Date and Time</option>
				<option value="month" selected={oldInputType === 'month' ? true : false}>Year Month</option>
				</select>
	
		</div>
		<div class="flex flex-col">
			<label for="requiredArg">Required?</label>
			<select id="requiredArg" name="requiredArg">
				<option value={false} selected={oldRequired === false ? true : false}>Not Required</option>
				<option value={true} selected={oldRequired === true ? true : false}>Required!</option>
			</select>
		</div>
		<button
			class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			formaction="?/editinput">save changes</button
		>
	</div>
</form>
