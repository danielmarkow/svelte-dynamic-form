<script lang="ts">
	import { enhance } from '$app/forms';
	// import type { PageData } from './$types';
	// import { page } from '$app/stores';
	import ClipboardSvg from '$lib/components/ClipboardSvg.svelte';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { PUBLIC_APP_URL } from '$env/static/public';

	// export let data: PageData;

	const queryClient = useQueryClient();

	// TODO validate
	const formsQuery = createQuery({
		queryKey: ['forms'],
		queryFn: async () => {
			const resp = await fetch('/api/form');
			return await resp.json();
		}
	});

	function copyToClipboard(formId: string) {
		navigator.clipboard.writeText(`${PUBLIC_APP_URL}public/${formId}`);
	}
</script>

<div class="h-6" />
<div class="flex flex-col gap-2">
	{#if $formsQuery.isLoading}
		<p class="text-sm">loading</p>
	{:else if $formsQuery.isError}
		<p>an error occurred loading forms</p>
	{:else if $formsQuery.isSuccess}
		{#each $formsQuery.data as form}
			<div class="border border-black p-1 bg-gradient-to-r from-gray-200">
				<div class="flex">
					<div class="w-2/3">
						<div class="flex gap-x-1 items-center">
							<h1 class="text-xl">{form.name}</h1>
							{#if form.public}
								<button type="button" on:click={() => copyToClipboard(form._id)}
									><ClipboardSvg /></button
								>
							{/if}
						</div>
						<p class="text-sm">{form.description}</p>
					</div>
					<div class="flex justify-end w-1/3">
						<p class="text-sm">{form.public ? 'public' : 'not public'}</p>
					</div>
				</div>

				<div class="flex gap-1">
					<a
						class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						href={`/form/${form._id}`}><button type="button"> edit </button></a
					>
					<form
						class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						method="POST"
						action="?/togglepublic"
						use:enhance={() => {
							// don't clear the forms, still need the id
							return () => {
								queryClient.invalidateQueries(['forms']);
							};
						}}
					>
						<input type="text" id="formId" name="formId" value={form._id} required hidden />
						<button formaction="?/togglepublic">
							{form.public ? 'take private' : 'make public'}
						</button>
					</form>
					<form
						class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						method="POST"
						action="?/deleteform"
						use:enhance={() => {
							// don't clear other forms
							return () => {
								queryClient.invalidateQueries(['forms']);
							};
						}}
					>
						<input type="text" id="formId" name="formId" value={form._id} required hidden />
						<button formaction="?/deleteform"> delete </button>
					</form>
				</div>
			</div>
		{/each}
	{/if}
</div>
<div class="h-5" />
<div class="border border-dashed border-gray-300 p-1">
	<form
		method="POST"
		action="?/createform"
		use:enhance={() => {
			return async ({ update }) => {
				queryClient.invalidateQueries(['forms']);
				update({ reset: true });
			};
		}}
	>
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
