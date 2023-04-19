<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation"
  import type { Record } from "pocketbase"

  export let data
  let cars = data.cars
  let carInput: HTMLInputElement
  let editMode = false

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

  async function removeCar(car: Record) {
    await carCollection.delete(car.id)
    invalidateAll()
  }

  $: cars = data.cars
</script>

<main>
  {#each $cars as car}
    {#if editMode}
      <div id="carContainer">
        <a id="carLink" href="/CarOverview/{car.id}">{car.carName}</a>
        <button on:click={() => removeCar(car)}>-</button>
      </div>
    {:else}
      <div id="carContainer"><a id="carLink" href="/CarOverview/{car.id}">{car.carName}</a></div>
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

<style lang="scss">
  main {
    font-family: "Avenir Next Condensed";
    font-style: italic;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 0.025em;
  }
    #carContainer {
        margin: 10px;
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
    }

    #carLink {
        text-decoration: none;
        color: black;
    }

</style>
