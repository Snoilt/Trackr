<script lang="ts">
  import { pb } from "$lib/pocketbase"
  import { goto } from "$app/navigation"
  import { DateTime } from "luxon"
  export let carID: string
  async function getCar() {
    const car = await pb.collection("cars").getOne(carID)
    return car
  }

  let car = getCar()

  async function formatDate() {
    const date = (await car).created
    const isoString = date.replace(" ", "T")
    const value = DateTime.fromISO(isoString).toFormat("dd/MM/yyyy")
    return value
  }
  let createdDate = formatDate()
</script>

<body class="my-11 sm:my-4 sm:mx-1 rounded-lg w-72 h-32">
  {#await car}
    <p>loading...</p>
  {:then car}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={() => {
        goto(`/CarOverview/${car.id}`)
      }}
      class="card card-hover p-4"
    >
      <header class="mb-3">
        <p class="font-bold text-2xl">{car.carName}</p>
      </header>
      <hr class="solid" />
      <section class="p-4">
        <div class="flex">
          <p class="text-slate-400">VIN:&emsp;</p>
          <p class="text-slate-200">WBAW55732XBRW439</p>
        </div>
        <div class="flex">
          <p class="text-slate-400">Date Built:&emsp;</p>
          <p class="text-slate-200">08/2002</p>
        </div>
        <div class="flex">
          <p class="text-slate-400">KeyCode:&emsp;</p>
          <p class="text-slate-200">4402/302</p>
        </div>
      </section>
      <hr class="solid" />
      <footer class="mt-3">
        {#await createdDate}
          <p>loading...</p>
        {:then createdDate}
          <p class="text-slate-300">Added on {createdDate}</p>
        {/await}
      </footer>
    </div>
  {/await}
</body>
