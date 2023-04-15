<script lang="ts">
    // import InputBox from "./lib/InputBox.svelte"
    import { currentUser, pb, signOut } from "$lib/pocketbase"
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    onMount(()=>{
        if ($currentUser) {
            goto ("/CarSelection")
        } else (
            goto("/Login")
        )
    })
  </script>
  