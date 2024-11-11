import { auth } from "@/auth";
import { NextResponse } from "next/server";

// List of routes that require authentication
const unprotectedRoutes = ["/"];

export default auth((req) => {
    const isLoggedIn = !!req.auth?.user?.email?.endsWith("@aptitud.se");

    const isProtectedRoute = !unprotectedRoutes.some((route) => req.nextUrl.pathname === route);

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
});

// This line configures which routes the middleware should run on
export const config = {
    matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
