<script lang="ts">
  import { signOut, currentUser } from "$lib/pocketbase"
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
    margin-bottom:20px;
  }
</style>
