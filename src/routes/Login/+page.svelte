<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase"
  import { goto } from '$app/navigation';

  let username: string
  let password: string
  let submitted = false

  async function login() {
    submitted = true
    try {
        const user = await pb.collection("users").authWithPassword(username, password)
    console.log(user)
    } catch (err) {
        console.log(err)
    }
    goto("/CarSelection")

  }
  async function signUp() {
    submitted = true
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
      }
      const createdUser = await pb.collection("users").create(data)
      await login()
      console.log("signed up")
    } catch (err) {
      console.log(err)
    }
  }
</script>

<main>
  {#if (submitted == false)}
    <form on:submit|preventDefault>
      <input placeholder="username" type="text" bind:value={username} />
      <input placeholder="password" type="password" bind:value={password} />
    </form>
    <button on:click={signUp}>Sign Up</button>
    <button on:click={login}>Login</button>
  {:else}
    <p>loading...</p>
  {/if}
</main>

<style>
</style>
