<script lang="ts">
  // Props
  /** Exposes parent props to this component. */
  export let parent: any
  // Stores
  import { modalStore } from "@skeletonlabs/skeleton"

  //Formatting the KeyCode to be split into hsn and tsn for the database
  let keyCode: string
  function formatKeyCode() {
    const codeArray = keyCode.split("/")
    const hsn = codeArray[0]
    const tsn = codeArray[1]
    return { hsn, tsn }
  }
  const formattedKeyCode = formatKeyCode()

  // Form Data
  const formData = {
    Make: "",
    Car: "",
    VIN: "",
    dateBuilt: "",
    hsn: formattedKeyCode.hsn,
    tsn: formattedKeyCode.tsn,
  }

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(formData)
    modalStore.close()
  }

  // Base Classes
  const cBase = "card p-4 w-modal shadow-xl space-y-4"
  const cHeader = "text-2xl font-bold"
  const cForm =
    "border border-surface-500 p-4 space-y-4 rounded-container-token"
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>{"Add Car" ?? "(title missing)"}</header>
    <!-- Enable for debugging: -->
    <!-- <pre>{JSON.stringify(formData, null, 2)}</pre> -->
    <form class="modal-form {cForm}">
      <label class="label">
        <span>Make</span>
        <input
          class="input"
          type="text"
          bind:value={formData.Make}
          placeholder="BMW"
        />
      </label>
      <label class="label">
        <span>Car</span>
        <input
          class="input"
          type="tel"
          bind:value={formData.Car}
          placeholder="420I XDrive"
        />
      </label>
      <label class="label">
        <span>VIN</span>
        <input
          class="input"
          type="email"
          bind:value={formData.VIN}
          placeholder="WBAWX42930D"
        />
      </label>
      <label class="label">
        <span>Date Built</span>
        <input
          class="input"
          type="email"
          bind:value={formData.dateBuilt}
          placeholder="07/2013"
        />
      </label>
      <label class="label">
        <span>Key Code</span>
        <input
          class="input"
          type="email"
          bind:value={keyCode}
          placeholder="223/2303"
        />
      </label>
    </form>
    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
    </footer>
  </div>
{/if}
