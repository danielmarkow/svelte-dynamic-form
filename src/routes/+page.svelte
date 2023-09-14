<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
</script>

<div class="h-4" />
<h1>welcome to librepoll</h1>

<!-- <p>
  {#if $page.data.session}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <br />
    <button class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" on:click={() => signOut()}>Sign out</button>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <br />
    <button class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" on:click={() => signIn("google")}>sign in with google</button>
  {/if}
</p> -->