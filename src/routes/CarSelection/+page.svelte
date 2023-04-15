<script lang="ts">
  import { currentUser, pb} from "$lib/pocketbase"
  import { onMount } from "svelte";

  async function getCarCollection() {
    const carCollection = await pb.collection("cars").getList()
    const cars = carCollection.items
    return cars
  }

 

</script>

<main />
  {#await getCarCollection()}
    <p>loading...</p>
  {:then cars}
    {#each cars as car}
      <button>{car.carName}</button>
    {/each}
  {/await}
<style>
</style>
