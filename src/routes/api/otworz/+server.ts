import { db } from "$lib/database";
import { type RequestHandler, error, json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user) {
        throw error(403, { message: "Unauthorized" });
    }

    const user = await db.user.findUnique({
        where: {
            id: locals.user.id,
        }
    })
    if (!user) {
        throw error(403, { message: "user not found" })
    }

    const data = await request.json();

    await db.itemy.create({
        data: {
            nazwa: data.nazwa,
            wartosc: data.wartosc,
            userId: locals.user.id
        }
    })

    await db.user.update({
        where: {
            id: locals.user.id,
        },
        data: {
            pieniadze: locals.user.money - data.koszt
        }
    })

    return json("ok");
}