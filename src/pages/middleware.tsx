// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LoginResponse } from 'src/models/auth/auth-request';

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
    //    const role = req.headers.get("authorization");
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');

    if (!authData.accessToken) {
        console.log('Zvikuita');

        return NextResponse.redirect('/pages/login')
    }

    return NextResponse.next();
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }