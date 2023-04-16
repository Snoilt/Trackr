<script lang="ts">
  export let data
  import EntryCarCreator from "$lib/EntryCreator.svelte"
  import type { Record } from "pocketbase"
  import { invalidate, invalidateAll } from "$app/navigation"

  let entries = data.entries
  let editMode = false
  let car = data.car

  async function removeEntry(entry: Record) {
    await data.collection.delete(entry.id)
    invalidateAll()
  }
  $: entries = data.entries
</script>

<main>
  <a href="/CarSelection">Go back to Overview</a>
  <h1>{car.carName}</h1>
  {#each $entries as entry}
    <div class="entry">
      <h3>{entry.maintenanceType}</h3>
      <h3>{entry.shortDescription}</h3>
      <h3>{entry.repairTime}</h3>
      <p>{entry.kilometersDone}Km</p>
      <p>{entry.doneText}</p>
      {#if editMode}
        <button on:click={() => removeEntry(entry)}>delete</button>
      {/if}
    </div>
  {/each}
  {#if editMode}
    <EntryCarCreator carId={data.slug} />
  {/if}
  <button
    on:click={() => {
      editMode = editMode ? false : true
    }}>Edit</button
  >
</main>

<style>
  .entry {
    background-color: beige;
    width: 250px;
    height: 200px;
  }
</style>
