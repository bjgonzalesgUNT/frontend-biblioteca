import { throwHttpErrorHandler } from "@/handlers";
import { LoginFormType } from "@/helpers/form-types";
import { UserAuthModel } from "@/models";
import { axiosInstance } from "@/tools";

export class AuthService {
  static async login(props: LoginFormType): Promise<UserAuthModel> {
    return axiosInstance
      .post("/auth/login", props)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
