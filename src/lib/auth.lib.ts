import { LoginFormType } from "@/helpers/form-types";
import { UserAuthModel } from "@/models";

export const singIn = async (values: LoginFormType): Promise<UserAuthModel> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
  });

  console.log(response.status);

  if (!response.ok) throw Error(response.statusText);

  return await response.json();
};

export const singOut = async (): Promise<void> => {
  await fetch("/api/auth/logout", {
    method: "DELETE",
  });
};
