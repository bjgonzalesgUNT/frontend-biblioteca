import { getHttpErrorHandler } from "@/handlers";
import { AuthService } from "@/services";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const userAuth = await AuthService.login({ username, password });

    const secret = process.env.NEXT_AUTH_SECRET as string;

    const token = jwt.sign(userAuth, secret, {
      expiresIn: "1h",
    });

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: "none",
      maxAge: 60 * 60,
      path: "/",
    });

    return NextResponse.json(userAuth, { status: 200 });
  } catch (error: any) {
    const { message, status } = getHttpErrorHandler(error);
    return NextResponse.json({ message: message }, { status });
  }
}
