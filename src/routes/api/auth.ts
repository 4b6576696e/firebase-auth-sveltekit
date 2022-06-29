import admin from '$lib/fb-admin'
import { dev } from '$app/env'

import * as cookie from 'cookie'

import type { RequestHandler } from '@sveltejs/kit'

const expiresIn = 7 * 24 * 60 * 60 * 1000
const secure = dev ? '' : 'Secure'

export const post: RequestHandler = async ({ request }) => {

    const { idToken } = await request.json()
    try {
        const sessionCookie = await admin.auth().createSessionCookie(idToken, {
            expiresIn,
        })

        return {
            status: 200,
            headers: {
                'Set-Cookie': `session=${sessionCookie}; Max-Age=${expiresIn}; Path=/; HttpOnly; ${secure};`
            }
        }
    } catch (e) {
        return {
            status: 500
        }
    }
}

export const del: RequestHandler = async (_) => {
    return {
        status: 200,
        headers: {
            "set-cookie": `session=_; Path=/; HttpOnly; Max-Age=0; ${secure};`
        }
    }
}