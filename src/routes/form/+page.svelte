<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	$: forms = JSON.parse(data.forms);
</script>

<div class="h-6" />
<div class="flex flex-col gap-2">
	{#each forms as form}
		<div class="border border-black p-1 bg-gradient-to-r from-gray-200">
			<h1 class="text-xl">{form.name}</h1>
			<p class="text-sm">{form.description}</p>
			<div class="flex gap-1">
				<form method="POST" action="?/deleteform" use:enhance>
					<a href={`/form/${form._id}`}
						><button
							type="button"
							class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							edit
						</button></a
					>
					<input type="text" id="formId" name="formId" value={form._id} required hidden />
					<button
						formaction="?/deleteform"
						class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>
						delete
					</button>
				</form>
			</div>
		</div>
	{/each}
</div>
<div class="h-5" />
<div class="border border-dashed border-gray-300 p-1">
	<form method="POST" action="?/createform" use:enhance>
		<h2 class="text-sm">Create Form</h2>
		<div
			class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
		>
			<label class="block text-xs font-medium text-gray-900" for="formName">Name</label>
			<input
				class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				type="text"
				id="formName"
				name="formName"
				required
			/>
		</div>
		<div class="h-1" />
		<div
			class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
		>
			<label class="block text-xs font-medium text-gray-900" for="formDescription"
				>Description</label
			>
			<textarea
				class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
				id="formDescription"
				name="formDescription"
			/>
		</div>
		<div class="h-1" />
		<button
			class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			formaction="?/createform">Create Form</button
		>
	</form>
</div>
