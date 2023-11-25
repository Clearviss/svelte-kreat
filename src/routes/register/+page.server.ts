import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'


import { db } from '$lib/database'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER',
}



interface TokenValidateResponse {
    'error-codes': string[];
    success: boolean;
    action: string;
    cdata: string;
}

async function validateToken(token: string, secret: string) {
    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                response: token,
                secret: secret,
            }),
        },
    );

    const data: TokenValidateResponse = await response.json();

    return {
        // Return the status
        success: data.success,

        // Return the first error if it exists
        error: data['error-codes']?.length ? data['error-codes'][0] : null,
    };
}



export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if logged in
    if (locals.user) {
        throw redirect(302, '/')
    }
}

// ...


const register: Action = async ({ request }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    if (
        typeof username !== 'string' ||
        typeof password !== 'string' ||
        !username ||
        !password
    ) {
        return fail(400, { invalid: true })
    }

    const token = data.get('cf-turnstile-response') // if you edited the formsField option change this
    const SECRET_KEY = '0x4AAAAAAAMnEZyvbZmPSgidS33OdvqykJA' // you should use $env module for secrets

    const { success, error } = await validateToken(token, SECRET_KEY);

    if (!success)
        return fail(400, { kapcza: true });


    const user = await db.user.findUnique({
        where: { username },
    })

    if (user) {
        return fail(400, { user: true })
    }

    await db.user.create({
        data: {
            username,
            passwordHash: password,
            userAuthToken: crypto.randomUUID(),
            role: { connect: { name: Roles.USER } },
            pieniadze: 100,
        },
    })

    throw redirect(303, '/login')
}

export const actions: Actions = { register }
