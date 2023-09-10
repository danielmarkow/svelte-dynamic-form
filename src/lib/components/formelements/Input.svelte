<script lang="ts">
	import type { InputFormElement } from "$lib/types";
  import EditInput from "./EditInput.svelte";

  export let el: InputFormElement;
  export let deleteElement: (elementId: string) => void;
  
  let showEdit = false;

</script>

{#if showEdit}
  <EditInput oldLabel={el.label} oldInputType={el.args} oldRequired={el.required} elId={el.id} on:notitfy={() => {
    showEdit = !showEdit
  }} />
{:else}
  <div id={el.id} class="flex flex-col w-2/3">
    <label for={el.id}>{el.label}</label>
    <input id={el.id} type={el.args} name={el.name} required={el.required || null} />
  </div>
{/if}

<div class="flex gap-2">
  <button type="button" on:click={() => deleteElement(el.id)}>delete</button>
  <button type="button" on:click={() => {
    showEdit = !showEdit
    }}>edit</button>
</div>