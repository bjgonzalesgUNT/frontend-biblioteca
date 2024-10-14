import { throwHttpErrorHandler } from "@/handlers";
import { RoleModel } from "@/models/role.model";
import { axiosInstance } from "@/tools";

export class RolesService {
  static async getRoles(): Promise<RoleModel[]> {
    return axiosInstance
      .get("/roles/find-all")
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
