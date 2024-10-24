import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib";

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // const userAuth = await getSession();

  // if (!userAuth && pathname.includes("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }

  // if (userAuth && pathname === "/login") {
  //   if (userAuth.user.role === "admin")
  //     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  //   if (userAuth.user.role === "user")
  //     return NextResponse.redirect(new URL("/", request.nextUrl));
  // }

  // if (
  //   userAuth &&
  //   pathname.includes("/dashboard") &&
  //   userAuth.user.role === "user"
  // )
  //   return NextResponse.redirect(new URL("/", request.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
