import { NextRequest, NextResponse } from "next/server";
import { isProtectedRoute, isPublicRoute, matchRoute } from "@/src/app/router/access-policy";

function hasAuthCookie(request: NextRequest): boolean {
  return Boolean(
    request.cookies.get("dzp_access_token")?.value ||
      request.cookies.get("dzp_refresh_token")?.value ||
      request.cookies.get("access_token")?.value ||
      request.cookies.get("refresh_token")?.value,
  );
}

function isOfferDetailRoute(pathname: string): boolean {
  return matchRoute(pathname, "/offers/:id");
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authenticated = hasAuthCookie(request);

  if (isOfferDetailRoute(pathname)) {
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname) && !authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
