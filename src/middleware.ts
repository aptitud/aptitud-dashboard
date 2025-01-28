import { auth } from "@/auth";

export default auth;

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|$).*)"],
};
