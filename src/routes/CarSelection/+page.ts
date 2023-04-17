import { currentUser, pb } from "$lib/pocketbase"
import { writable } from "svelte/store"
import { error } from "@sveltejs/kit"
export const load = async () => {
  try {
    const carCollection = await pb.collection("cars")
    // console.log("loaded")

    return {
      carCollection: carCollection,
      cars: writable((await carCollection.getList()).items),
      user: pb.authStore.model?.id,
    }
  } catch (e) {
    console.log(e)
    return error(69)
  }
}
