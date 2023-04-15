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
  
  
  
  
  <main>  
  </main>
  
  <style>
    #headLine {
      position: absolute;
      top: 2rem;
      left: 0;
      right: 0;
      text-align: center;
      margin: 0;
      padding: 0;
      font-size: 3rem;
      font-weight: 700;
      color: #1b1b1b;
      padding: 1rem;
      margin-bottom: 30px;
    }
  </style>
  