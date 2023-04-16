import { currentUser, pb} from "$lib/pocketbase"
import { writable } from "svelte/store"
export const load = async ({ params }) => {
    const maintenanceEntriesCollection = await pb.collection("maintenance_entry")
    const maintenanceEntries = await maintenanceEntriesCollection.getList(1,50,{filter:`carConnector.id="${params.slug}"`})
    const car = await pb.collection("cars").getOne(params.slug)
    console.log("loaded")
    return {
        collection: maintenanceEntriesCollection,
        slug: params.slug,
        entries: writable(maintenanceEntries.items),
        car: car
    }
}