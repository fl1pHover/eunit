
import { authRoutes, protectedRoutes } from "../constants/routes"
import { NextRequest, NextResponse } from "next/server"


export function middleware(req: NextRequest) {
    const currentUser = req.cookies.get("currentUser")

    if(
        protectedRoutes.includes(req.nextUrl.pathname) && !currentUser 
    ) {
        req.cookies.delete('currentUser')
        const res = NextResponse.redirect(new URL('/login', req.url))

        res.cookies.delete('currentUser')
        return res
}
if(authRoutes.includes(req.nextUrl.pathname) && currentUser) {

        return NextResponse.redirect(new URL('/account', req.url))
    }
}