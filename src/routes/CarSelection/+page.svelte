<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation"
  import { goto } from "$app/navigation"
  import { currentUser, pb } from "$lib/pocketbase"
  import type { Record } from "pocketbase"
  import { load } from "../CarOverview/[slug]/+page.js"

  export let data
  let cars = data.cars
  let carInput: HTMLInputElement
  const carCollection = data.carCollection

  async function addCar() {
    let carAddData = {
      carName: carInput.value,
      user: data.user,
    }
    await carCollection.create(carAddData)
    carInput.value = ""
    invalidateAll()
  }

  
  let editMode = false

  async function removeCar(car: Record) {
    await carCollection.delete(car.id)
    invalidateAll()
  }



  $: cars = data.cars
</script>

<main>
  {#each $cars as car}
    {#if editMode}
      <div>
        <a href="/CarOverview/{car.carName}">{car.carName}</a>
        <button on:click={()=> removeCar(car)}>-</button>
      </div>
    {:else}
      <div><a href="/CarOverview/{car.carName}">{car.carName}</a></div>
    {/if}
  {/each}
  <div>
    {#if editMode}
      <input type="text" placeholder="Car Name" bind:this={carInput} />
      <button on:click={addCar}>Add Car</button>
    {/if}
  </div>
  <button
    on:click={() => {
      editMode = editMode ? false : true
    }}>Edit</button
  >
</main>

<style>
</style>
