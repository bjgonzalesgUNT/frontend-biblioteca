import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userAuth = await getSession();

  if (userAuth && pathname === "/login")
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));

  if (!userAuth && pathname.includes("/dashboard"))
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  if (
    userAuth &&
    pathname === "/dashboard" &&
    !userAuth.user.pages.includes(pathname)
  )
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
