import type { Handle, GetSession } from '@sveltejs/kit'

import admin from '$lib/fb-admin'
import * as cookie from 'cookie'


export const getSession: GetSession = async ({ request }) => {
    console.log(request)
    const { session } = cookie.parse(request.headers.get('cookie') || '')
    console.log(session)
    try {
        const claims = await admin.auth().verifySessionCookie(session)

        return {
            user: {
                exist: true,
                ...claims
            }
        }
    } catch {
        return {
            user: {
                exist: false
            }
        }
    }
}