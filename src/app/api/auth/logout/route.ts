import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function DELETE() {
  cookies().delete("session");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
