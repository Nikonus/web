import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();

  },
  
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Everything else requires login
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};