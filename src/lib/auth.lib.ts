import { throwHttpErrorHandler } from "@/handlers";
import { LoginFormType } from "@/helpers/form-types";
import { UserAuthModel } from "@/models";
import { localAxiosInstance } from "@/tools";

export const singIn = async (values: LoginFormType): Promise<UserAuthModel> => {
  return await localAxiosInstance
    .post("/auth/login", values)
    .then((response) => response.data)
    .catch(throwHttpErrorHandler);
};

export const singOut = async (): Promise<void> => {
  localAxiosInstance.delete("/auth/logout");
};
