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
      submitted = false
    }
  }
</script>

<body data-theme="skeleton" class="bg-no-repeat h-screen w-screen place-items-center grid">
  <div class="card p-4 w-72 h-96 grid place-items-center" id="stuffContainer">
    <h1 class="text-center text-2xl">Trackr</h1>
    <p class="italic">Personal Car Service Assistant</p>
    <main class="place-items-center grid space-y-2">
      {#if submitted == false}
        <form on:submit|preventDefault class="space-y-2">
          <label class="label">
            <input
              class="input"
              placeholder="username"
              type="text"
              bind:value={username}
            />
          </label>
          <input
            class="input"
            placeholder="password"
            type="password"
            bind:value={password}
          />
        </form>
        <button class="btn variant-ghost" on:click={login}>Login</button>
      {:else}
        <p>loading...</p>
      {/if}
    </main>
    <div id="footer">
      <p id="noACC">
        No account? <a href="/SignUp">Sign Up</a>
      </p>
    </div>
  </div>
</body>

<style lang="scss">
</style>
