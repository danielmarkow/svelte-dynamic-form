<script lang="ts">
	import NewInput from "./input/NewInput.svelte";


let elementType = "input";

</script>

<div class="flex border border-dotted border-gray-400 p-1">
  <div class="w-1/3">
    <select bind:value={elementType}>
      <option value="input">new input</option>
      <option value="select">new select</option>
    </select>
  </div>
  <div class="w-2/3">
    {#if elementType === "input"}
      <NewInput />
    {/if}

  </div>
</div>