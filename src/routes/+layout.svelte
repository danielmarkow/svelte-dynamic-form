<script lang="ts">
	import '../app.css';
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
	// import type { LayoutData } from './$types';

	// export let data: LayoutData;
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<nav class="border-b border-black h-10">
		<div class="h-1" />
		<div class="flex">
			<div class="flex flex-row w-1/2 justify-start space-x-2">
				<a class="border-black border-b hover:border-b-2 text-sm pt-1" href="/"><button type="button">home</button></a>
				<a class="border-black border-b hover:border-b-2 text-sm pt-1" href="/form"><button type="button">my forms</button></a>
			</div>
			<div class="flex flex-row w-1/2 justify-end space-x-5 pr-1">
				{#if $page.data.session}
				<div>
					<p class="text-xs">signed in as</p>
					<p class="text-xs">{$page.data.session.user?.name ?? "User"}</p>
				</div>
				<button class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
				type="button" on:click={() => signOut("google")}>sign out</button>
				{:else}
				<!-- TODO sign in button has different height than sign out -->
				<button class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" on:click={() => signIn("google")}>sign in</button>
				{/if}
			</div>

		</div>
	</nav>
	<slot />
</div>
