import { currentUser, pb} from "$lib/pocketbase"
import { writable } from "svelte/store"
export const load = async ({ params }) => {
    const maintenanceEntries = await pb.collection("maintenance_entry").getList()
    const car = await pb.collection("cars").getOne(params.slug)
    console.log("loaded")
    return {
        slug: params.slug,
        entries: writable(maintenanceEntries.items),
        car: car
    }
}