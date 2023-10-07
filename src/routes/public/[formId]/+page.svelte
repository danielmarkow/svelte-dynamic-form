<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.form}
	<div class="h-4" />
	<h1 class="text-xl">{data.form.name}</h1>
	<p>{data.form.description}</p>
	<div class="h-4" />
	<form method="POST" action="?/result" use:enhance>
		<div class="flex flex-col gap-y-1 md:w-2/3 w-full">
			{#if data.form.elements.length === 0}
				<p class="italic">no form elements yet</p>
			{/if}
			{#each data.form.elements as el}
				{#if el.type === 'input'}
					<div id={el.id} class="flex flex-col">
						<label for={el.id}>{el.label}</label>
						<input id={el.id} type={el.args} name={el.label} required={el.required || null} />
					</div>
				{/if}
				{#if el.type === 'select'}
					<div id={el.id} class="flex flex-col gap-y-1">
						<label for={el.id}>{el.label}</label>
						<select id={el.id} name={el.label}>
							{#each el.args as opt}
								<option value={opt.optValue}>{opt.optLabel}</option>
							{/each}
						</select>
					</div>
				{/if}
			{/each}
		</div>
		<button formaction="?/result">send</button>
	</form>
{:else}
	<p>form not public</p>
{/if}
