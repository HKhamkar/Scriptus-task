import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookies = req.cookies.get("user_details");
  const loginPath = "/login";

  if (cookies && req.nextUrl.pathname === loginPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!cookies && req.nextUrl.pathname !== loginPath) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
