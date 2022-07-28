
import { NextResponse } from "next/server"
import type { NextFetchEvent, NextRequest } from "next/server"
import { LoginResponse } from "src/models/auth/auth-request"


const getAuthDetails = (): LoginResponse => {
    return JSON.parse(localStorage.getItem('authData') || '{}')
}
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    // return early if url isn"t supposed to be protected
    // if (!req.url.includes("/protected-url")) {
    //     return NextResponse.next()
    // }
    console.log(getAuthDetails());


    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!getAuthDetails().accessToken) return NextResponse.redirect("/pages/login/")

    // If user is authenticated, continue.
    return NextResponse.next()
}

export const config = {
    matcher: '/pages/:path*',
}