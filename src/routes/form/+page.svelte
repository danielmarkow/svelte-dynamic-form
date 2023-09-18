<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { page } from "$app/stores";

	export let data: PageData;
</script>
<!-- TODO: can't create new form after deleting an old one -->
<div class="h-6" />
	{#if $page.data.session}
	<div class="flex flex-col gap-2">
		{#each JSON.parse(data.forms) as form}
			<div class="border border-black p-1 bg-gradient-to-r from-gray-200">
				<div class="flex">
					<div class="w-2/3">
						<h1 class="text-xl">{form.name}</h1>
						<p class="text-sm">{form.description}</p>
					</div>
					<div class="flex justify-end w-1/3">
						<p class="text-sm">{form.public ? "public" : "not public"}</p>
					</div>
				</div>
				
				<div class="flex gap-1">
					<a class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" href={`/form/${form._id}`}
						><button
							type="button"
							
						>
							edit
						</button></a
					>
					<button
							type="button"
							class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							{form.public ? "take private" : "make public"}
						</button>
					<form class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" method="POST" action="?/deleteform" use:enhance>
						<input type="text" id="formId" name="formId" value={form._id} required hidden />
						<button
							formaction="?/deleteform"
							
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
			<input type="text" value="false" id="public" name="public" required hidden />
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
	{:else}
	<p>please sign in</p>
	{/if}