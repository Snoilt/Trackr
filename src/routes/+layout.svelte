<script lang="ts">
  import { signOut, currentUser } from "$lib/pocketbase"
  // Your selected Skeleton theme:
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  // This contains the bulk of Skeletons required styles:
  import "@skeletonlabs/skeleton/styles/all.css"

  // Finally, your application's global stylesheet (sometimes labeled 'app.css')
  import "../app.postcss"
  
</script>

<slot />
<div id="container">
  {#if $currentUser}
    <button on:click={signOut}>Sign Out</button>
  {/if}
</div>


<style lang="scss">
  #container {
    position: fixed;
    width: 100%;
    bottom: 0;
    margin-bottom: 20px;
  }
</style>
