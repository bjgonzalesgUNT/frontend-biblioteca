import { JWT } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  (req: NextRequestWithAuth) => {
    const { user } = req.nextauth.token as JWT;

    console.log(req.nextUrl.pathname);

    if (!user.pages.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  { pages: { signIn: "/login" } },
);

export const config = {
  matcher: ["/(.*)"],
};
