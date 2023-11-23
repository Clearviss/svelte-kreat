import { db } from "$lib/database";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {
    return {
        posciki: await db.post.findMany(),
    }
}