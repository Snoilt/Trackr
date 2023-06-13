<script lang="ts">
  import { onMount } from "svelte"
  import { pb } from "./pocketbase"
  import { invalidate, invalidateAll } from "$app/navigation"

  export let carId: string 

  // create bindings for all the input fields
  let typeInput: HTMLInputElement
  let shortDescInput: HTMLInputElement
  let dateInput: HTMLInputElement
  let timeInput: HTMLInputElement
  let kilometersInput: HTMLInputElement
  let longDescInput: HTMLInputElement

  // create a function that creates a new entry in the database

  async function createEntry() {
    const entryCollection = await pb.collection("maintenance_entry")
    //FIX CARID 
    const carId = await pb.collection("cars").getList()
    const entryData = {
      maintenanceType: typeInput,
      shortDescription: shortDescInput,
    //   date: dateInput,
    //   time: timeInput,
      kilometersDone: kilometersInput,
      doneText: longDescInput,
      carConnector: carId.items[0].id,
    }
    await entryCollection.create(entryData)
    console.log(entryData)
    invalidateAll()
  }
</script>

<main>
  <div>
    <div id="type">
      <p>Service Type:</p>
      <select bind:value={typeInput}>
        <option value="Maintenance">Maintenance</option>
        <option value="Repair">Repair</option>
        <option value="Upgrade">Upgrade</option>
        <option value="Inspection">Inspection</option>
      </select>
    </div>
    <div id="shortDesc">
      <p>Short Description:</p>
      <input type="text" placeholder="type here" bind:value={shortDescInput} />
    </div>
    <div id="dateAndTime">
      <p>Date and Time</p>
      <input type="date" />
      <input type="time" />
    </div>
    <div id="kilometersDone">
      <p>Kilometers:</p>
      <input type="number" bind:value={kilometersInput} />
    </div>
    <div id="longDesc">
      <p>Long Description (optional):</p>
      <textarea bind:value={longDescInput} />
    </div>
  </div>
  <button on:click={createEntry} >Add</button>
</main>

<style>
    main {
        background-color: aquamarine;
        width: 230px;
        height: 400px;
    }
</style>
