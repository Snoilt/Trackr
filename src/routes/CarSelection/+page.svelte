<script lang="ts">
  import CarWidget from "$lib/CarWidget.svelte"
  import { invalidate, invalidateAll } from "$app/navigation"
  import type { Record } from "pocketbase"
  import CarAdd from "$lib/CarAdd.svelte"

  import { Modal, modalStore } from "@skeletonlabs/skeleton"
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton"

  interface carData {
    Make: String
    Car: String
    VIN: String
    dateBuilt: String
    hsn: String
    tsn: String
  }

  const modalComponent: ModalComponent = {
    ref: CarAdd,
  }
  const d: ModalSettings = {
    type: "component",
    // Pass the component directly:
    component: modalComponent,
    response: (r: carData) => addCar(r),
  }
  //data from +page.ts load function
  export let data

  let cars = data.cars
  let editMode = false

  const carCollection = data.carCollection

  async function addCar(formData: carData) {
    let carAddData = {
      carMake: formData.Make,
      carName: formData.Car,
      user: data.user,
      dateBuild: formData.dateBuilt,
      vin: formData.VIN,
      hsn: formData.hsn,
      tsn: formData.tsn,
    }
    await carCollection.create(carAddData)
    invalidateAll()
  }

  async function removeCar(car: Record) {
    await carCollection.delete(car.id)
    invalidateAll()
  }

  $: cars = data.cars
</script>

<Modal />

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

  <button
    on:click={() => {
      modalStore.trigger(d)
    }}>Add Car</button
  >
</body>

<style lang="scss">
</style>
