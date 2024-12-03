"use server";

import { SESSION_KEY } from "@/constants";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { IPayload } from "./interfaces";

const secretKey = process.env.SECRET_JWT;
const encodedKey = new TextEncoder().encode(secretKey);

export const encrypt = (payload: IPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decrypt = async (session: string): Promise<IPayload | null> => {
  try {
    const { payload } = await jwtVerify<IPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
};

export const getSession = async (): Promise<IPayload | null> => {
  const token = cookies().get(SESSION_KEY)?.value || "";

  return await decrypt(token);
};
