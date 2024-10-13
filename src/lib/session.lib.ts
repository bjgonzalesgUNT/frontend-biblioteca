"use server";

import { SESSION_KEY } from "@/constants";
import { UserAuthModel } from "@/models";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getSession = async (): Promise<UserAuthModel | null> => {
  const token = cookies().get(SESSION_KEY)?.value;

  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_AUTH_SECRET);

    const { payload } = await jwtVerify<UserAuthModel>(token, secret);

    return payload;
  } catch (error) {
    return null;
  }
};
