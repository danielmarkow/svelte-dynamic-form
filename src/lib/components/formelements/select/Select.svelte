<script lang="ts">
  import type {SelectFormElement} from "$lib/types"
  
  export let el: SelectFormElement;
	export let deleteElement: (elementId: string) => void;

	let showEdit = false;
</script>
  {#if showEdit}
    <p>TODO edit select form</p>
  {:else}
    <div id={el.id} class="flex flex-col gap-y-1 w-2/3">
      <label for={el.id}>{el.label}</label>
      <select id={el.id} name={el.name}>
        {#each el.args as opt}
          <option value={opt.optValue}>{opt.optLabel}</option>
        {/each}
      </select>
    </div>
  {/if}

  <div class="flex gap-2">
    <button type="button" on:click={() => deleteElement(el.id)}>delete</button>
    <button
      type="button"
      on:click={() => {
        showEdit = !showEdit;
      }}>edit</button
    >
  </div>