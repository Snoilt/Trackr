<script lang="ts">
export let data
</script>

<main />
  {#await data}
    <p>loading...</p>
  {:then data}
    {#each data.cars as car}
      <button><a href="/CarOverview/{car.carName}">{car.carName}</a></button>
    {/each}
  {/await}
<style>
</style>
