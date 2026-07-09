import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/", "/login"];

  // Allow Next.js internals and auth APIs
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
      // Redirect logged-in users away from login
      if (pathname === "/login" && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return NextResponse.next();
  }

  // Protected routes
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/interview") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/history")
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};