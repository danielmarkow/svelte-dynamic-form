<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/createinput" use:enhance>
	<div class="flex flex-col gap-y-1">
		<div
			class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
		>
			<label for="labelInput" class="block text-xs font-medium text-gray-900">Label</label>
			<input
				class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				id="labelInput"
				name="labelInput"
				type="text"
				required
			/>
		</div>
		<div
			class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
		>
			<label class="block text-xs font-medium text-gray-900" for="inputArg">Input Type</label>
			<select
				class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				id="inputArg"
				name="inputArg"
			>
				<option value="text" selected>Text</option>
				<option value="number">Number</option>
				<option value="email">Email</option>
				<option value="url">Url</option>
				<option value="date">Date</option>
				<option value="datetime-local">Date and Time</option>
				<option value="month">Year Month</option>
			</select>
		</div>
		<div
			class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
		>
			<label class="block text-xs font-medium text-gray-900" for="requiredArg">Required?</label>
			<select
				class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				id="requiredArg"
				name="requiredArg"
			>
				<option value={false} selected>Not Required</option>
				<option value={true}>Required!</option>
			</select>
		</div>
	</div>
	<button
		class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
		formaction="?/createinput">Add Input</button
	>
</form>
