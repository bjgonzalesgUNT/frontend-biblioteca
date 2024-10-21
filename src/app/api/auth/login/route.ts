import { getHttpErrorHandler } from "@/handlers";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    // const userAuth = await AuthService.login({ username, password });

    const secret = process.env.NEXT_AUTH_SECRET as string;

    const provisionalUser = {
      user: {
        id: 1,
        username: "70452182",
        names: "BRANDON JOSEPH",
        surnames: "GONZALES GUTIERREZ",
        document: "70452182",
        role: "admin",
        pages: ["/dashboard", "/dashboard/users"],
        status: true,
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiI3MDQ1MjE4MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyOTUxMzcwOSwiZXhwIjoxNzI5NjAwMTA5fQ.b8dEAg3LRBc_2lLDHnR4x-vWlpJZwHbGs9l7ufZm8tA",
      iat: 1729513709,
      exp: 1729517309,
    };

    const token = jwt.sign(provisionalUser, secret, {
      expiresIn: "1h",
    });

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "none",
      maxAge: 60 * 60,
      path: "/",
    });

    return NextResponse.json(provisionalUser, { status: 200 });
  } catch (error: any) {
    const { message, status } = getHttpErrorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
}
