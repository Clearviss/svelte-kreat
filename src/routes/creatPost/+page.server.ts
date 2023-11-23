import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import { page } from '$app/stores';
import { db } from '$lib/database'


export const load: PageServerLoad = async () => {
    return {
        posciki: await db.post.findMany(),
    }
}








export const actions: Actions = {
    creatPost: async ({ request, locals }) => {
        const data = await request.formData()
        const userid = locals.user.name
        const zawartosc = String(data.get('poscik'))
        await db.post.create({
            data: {
                content: zawartosc,
                userId: userid,
            },
        })


    }, deletePost: async ({ locals }) => {
        await db.post.deleteMany({
            where: {
                userId: locals.user.name,
            }
        })
    },
    deletePostall: async ({ }) => {
        await db.post.deleteMany({})
    }
}
