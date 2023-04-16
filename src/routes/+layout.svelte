<script lang="ts">
  import { signOut, currentUser } from "$lib/pocketbase"
</script>

{#if $currentUser}
  <button on:click={signOut}>Sign Out</button>
{/if}

<slot />
