<script lang="ts">
export let data
</script>

<main />
    {#each data.cars as car}
      <button><a href="/CarOverview/{car.carName}">{car.carName}</a></button>
    {/each}
<style>
</style>
