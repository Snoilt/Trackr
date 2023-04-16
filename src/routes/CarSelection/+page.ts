import { currentUser, pb} from "$lib/pocketbase"
import { writable } from "svelte/store"
import { error } from '@sveltejs/kit';
export const load = async () => {
    const carCollection = await pb.collection("cars")
    // console.log("loaded")
    if (!carCollection) {
        throw error(404, { message: "Not found" })
    }
    return {
        carCollection: carCollection,
        cars: writable((await carCollection.getList()).items),
        user: pb.authStore.model?.id
    }
}