<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase"
  import { goto, invalidateAll } from "$app/navigation"

  let username: string
  let password: string
  let submitted = false

  async function login() {
    submitted = true
    try {
      const user = await pb
        .collection("users")
        .authWithPassword(username, password)
      console.log(user)
      goto("/CarSelection")
    } catch (err) {
      console.log(err)
      submitted = false
    }
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
      goto("/CarSelection")
    } catch (err) {
      console.log(err)
      submitted = false    }
  }
</script>

<main>
    <h1>Trackr.</h1>
  {#if submitted == false}
    <form on:submit|preventDefault>
      <input
        class="inputForms"
        placeholder="username"
        type="text"
        bind:value={username}
      />
      <input
        class="inputForms"
        placeholder="password"
        type="password"
        bind:value={password}
      />
    </form>
    <button class="buttonStuff" on:click={login}>Login</button>
    <button class="buttonStuff" on:click={signUp}>Sign Up</button>
  {:else}
    <p>loading...</p>
  {/if}
</main>

<style lang="scss">
  $basicFont: "Avenir Next Condensed", sans-serif;
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .inputForms {
    display: block;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }
  ::placeholder,
  .buttonStuff, .inputForms, h1 {
    font-family: $basicFont;
    font-style: italic;
    font-weight: 900;
    font-size: 15px;
    letter-spacing: 0.025em;
  }

  .buttonStuff {
    color: black;
    border-radius: 10px;
    border:none;
    margin-top: 10px;
    width: 100px;
    height: 50px;
  }
  h1 {
    font-size: 45px;
  }
</style>
