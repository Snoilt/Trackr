<script lang="ts">
  import { pb } from "$lib/pocketbase"
  export let carID: string
  async function getCar() {
    const car = await pb.collection("cars").getOne(carID)
    return car
  }
  let car = getCar()

</script>

<body class="my-11 sm:my-2 sm:mx-1 rounded-lg w-72 h-32">
  {#await car}
    <p>loading...</p>
  {:then car}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card card-hover p-4">
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
        <p>Some Footer Text</p>
      </footer>
    </div>
  {/await}
</body>
