import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { db } from '$lib/database'





export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if not logged in
    if (!locals.user) {
        throw redirect(302, '/')
    }
    return {
        ekwipunek: await db.itemy.findMany({
            where: { userId: locals.user.id },
        }),
    }
}
