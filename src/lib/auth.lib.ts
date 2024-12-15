"use server";

import { createAuthCookie } from "@/actions";
import { SESSION_KEY } from "@/constants";
import { LoginFormType } from "@/helpers/form-types";
import { UserAuthModel } from "@/models";
import { AuthService } from "@/services";
import { cookies } from "next/headers";
import { IPayload } from "./interfaces";
import { decrypt, encrypt } from "./session.lib";

export const singIn = async (values: LoginFormType): Promise<UserAuthModel> => {
  try {
    const auth = await AuthService.login(values);

    const token = await encrypt({
      user: auth.user,
      token: auth.token,
    });

    await createAuthCookie(token);

    return auth;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getSession = async (): Promise<IPayload | null> => {
  const token = cookies().get(SESSION_KEY)?.value || "";

  return await decrypt(token);
};
