import { currentUser, pb} from "$lib/pocketbase"
export const load = ({ params }) => {
    const maintenanceEntries = pb.collection("maintenance_entry").getList()
    return {
        slug: params.slug,
        entries: maintenanceEntries
    }
}