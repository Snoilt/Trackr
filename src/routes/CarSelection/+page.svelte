<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation"
  import { goto } from "$app/navigation"
  import { currentUser, pb } from "$lib/pocketbase"
  import { load } from "../CarOverview/[slug]/+page.js"

  export let data
  let cars = data.cars
  let carInput: HTMLInputElement

  async function addCar() {
    const carCollection = data.carCollection
    let carAddData = {
      carName: carInput.value,
      user: data.user,
    }
    await carCollection.create(carAddData)
    invalidateAll()
  }
  $: cars = data.cars
</script>

<main>
  {#each $cars as car}
    <button><a href="/CarOverview/{car.carName}">{car.carName}</a></button>
  {/each}
  <div>
    <input type="text" placeholder="Car Name" bind:this={carInput} />
    <button on:click={addCar}>Add Car</button>
  </div>
</main>

<style>
</style>
