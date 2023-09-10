<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/createinput" use:enhance>
	<div class="flex flex-col gap-y-1">
		<div class="flex flex-col">
			<label for="labelInput">Label</label>
			<input id="labelInput" name="labelInput" type="text" required />
		</div>
		<div class="flex flex-col">
			<label for="inputArg">Input Type</label>
			<select id="inputArg" name="inputArg">
				<option value="text" selected>Text</option>
				<option value="number">Number</option>
				<option value="email">Email</option>
				<option value="url">Url</option>
				<option value="date">Date</option>
				<option value="datetime-local">Date and Time</option>
				<option value="month">Year Month</option>
			</select>
		</div>
		<div class="flex flex-col">
			<label for="requiredArg">Required?</label>
			<select id="requiredArg" name="requiredArg">
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
