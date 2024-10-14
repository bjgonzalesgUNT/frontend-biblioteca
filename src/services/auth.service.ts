import { throwHttpErrorHandler } from "@/handlers";
import {
  ChangePasswordFormType,
  LoginFormType,
  SignUpFormType,
} from "@/helpers/form-types";
import { UserAuthModel, UserModel } from "@/models";
import { axiosInstance } from "@/tools";

export class AuthService {
  static async login(props: LoginFormType): Promise<UserAuthModel> {
    return axiosInstance
      .post("/auth/login", props)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async signUp(props: SignUpFormType): Promise<UserModel> {
    return axiosInstance
      .post("/auth/signup", props)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async changePassword(props: ChangePasswordFormType): Promise<void> {
    const { confirm_password, ...rest } = props;
    return axiosInstance
      .patch("/auth/change-password", rest)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
