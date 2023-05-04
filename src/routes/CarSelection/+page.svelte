<script lang="ts">
  import CarWidget from "$lib/CarWidget.svelte"
  import { invalidate, invalidateAll } from "$app/navigation"
  import type { Record } from "pocketbase"
  import CarAdd from "$lib/CarAdd.svelte"


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

<body
  data-theme="skeleton"
  class="bg-no-repeat h-screen w-screen grid justify-items-center"
>
  <h1 class="mt-8">Overview</h1>
  <main class="grid grid-cols-1 sm:grid-cols-2">
    {#each $cars as car}
      <CarWidget carID={car.id} />
    {/each}
  </main>
  <button
    type="button"
    class="btn variant-filled-secondary h-12 w-20 mt-12"
    on:click={() => {
      editMode = editMode ? false : true
    }}>Edit</button
  >
  
</body>

<style lang="scss">
</style>
