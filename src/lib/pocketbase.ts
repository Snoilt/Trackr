import PocketBase from "pocketbase"
import { writable } from "svelte/store"
import { goto } from '$app/navigation';

export const pb = new PocketBase("https://oep.oellers.net")

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange(auth => {
  console.log("authStore changed", auth)
  currentUser.set(pb.authStore.model)
})

export function signOut() {
  pb.authStore.clear()
  goto ("/Login")
}
