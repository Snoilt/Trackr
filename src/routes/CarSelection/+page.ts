import { currentUser, pb} from "$lib/pocketbase"
export const load = async () => {
    const carCollection = await pb.collection("cars").getList()
    const cars = carCollection.items
    return {cars}
}