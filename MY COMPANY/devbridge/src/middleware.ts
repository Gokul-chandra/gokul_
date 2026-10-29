import { NextResponse, type NextRequest } from "next/server";

/**
 * Lightweight gate: redirects visitors with no session cookie away from dashboards.
 * This is NOT the authorization boundary. Every dashboard page and API route re-checks the
 * user's role from the database via requireRole()/getCurrentUser().
 */
export function middleware(req: NextRequest) {
  if (!req.cookies.get("db_session")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/customer/:path*", "/developer/:path*", "/admin/:path*", "/dashboard"],
};
