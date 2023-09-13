<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	$: forms = JSON.parse(data.forms);
</script>

<h1>your forms</h1>
<div>
	{#each forms as form}
		<div class="border border-gray-300 p-1">
			<p>{form.name}</p>
			<p>{form.description}</p>
			<button type="button" class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
				<a href={`/form/${form._id}`}>edit</a>
			</button>
			<form method="POST" action="?/deleteform" use:enhance>
				<input type="text" id="formId" name="formId" value={form._id} required hidden />
				<button formaction="?/deleteform" class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
					delete
				</button>
			</form>
		</div>
	{/each}
</div>
<hr class="w-2/3 mt-4 mb-2" />
<div class="flex flex-col gap-y-1 w-2/3 border border-dashed border-gray-300 p-1">
	<form method="POST" action="?/createform" use:enhance>
		<h2>Create Form</h2>
		<div class="flex flex-col">
			<label for="formName">Name</label>
			<input type="text" id="formName" name="formName" required />
		</div>
		<div class="flex flex-col">
			<label for="formDescription">Description</label>
			<textarea id="formDescription" name="formDescription" />
		</div>
		<button
			class="mt-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			formaction="?/createform">Create Form</button
		>
	</form>
</div>
