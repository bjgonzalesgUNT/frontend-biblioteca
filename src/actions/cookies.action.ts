"use server";

import { SESSION_KEY } from "@/constants";
import { cookies } from "next/headers";

export const createAuthCookie = async (token: string) => {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

  cookies().set(SESSION_KEY, token, {
    secure: true,
    httpOnly: true,
    expires: expiresAt,
  });
};

export const deleteAuthCookie = async () => {
  cookies().delete(SESSION_KEY);
};
