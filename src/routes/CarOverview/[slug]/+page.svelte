<script lang="ts">
  export let data
  import EntryCarCreator from "$lib/EntryCreator.svelte"
  let entries = data.entries

  let car = data.car
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
    </div>
  {/each}
  <EntryCarCreator carId={data.slug} />
</main>

<style>
  .entry {
    background-color: beige;
    width: 250px;
    height: 200px;
  }
</style>
