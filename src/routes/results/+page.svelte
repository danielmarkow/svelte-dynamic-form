<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import type { PageData } from './$types';

	export let data: PageData;
	let headings: string[];

	const resultsQuery = createQuery({
		queryKey: ['results'],
		queryFn: async () => {
			const resp = await fetch('/api/results');
			return await resp.json();
		},
		onSuccess: (data) => {
			headings = Object.keys(data[0].results[0]);
			console.log(headings);
		}
	});
</script>

<p>results</p>
{#if $resultsQuery.isSuccess}
	{#each $resultsQuery.data as res}
		<h1>{res.name}</h1>
		<h2>{res.description}</h2>
		<table>
			<thead>
				{#each headings as header}
					<th>{header}</th>
				{/each}
			</thead>
			<tbody>
				{#each res.results as result}
					<tr>
						{#each headings as header}
							<td>{result[header]}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
{/if}
