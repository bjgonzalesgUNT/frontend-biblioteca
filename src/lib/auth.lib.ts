"use server";

import { createAuthCookie } from "@/actions";
import { LoginFormType } from "@/helpers/form-types";
import { UserAuthModel } from "@/models";
import { AuthService } from "@/services";
import { encrypt } from "./session.lib";

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
