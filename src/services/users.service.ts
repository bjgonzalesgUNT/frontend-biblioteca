import { throwHttpErrorHandler } from "@/handlers";
import { PaginationModel, UserModel } from "@/models";
import { axiosInstance } from "@/tools";

export class UsersService {
  static async getAllPaginate(
    page: number,
  ): Promise<PaginationModel<UserModel>> {
    return axiosInstance
      .get("/users/find-all-paginate", { params: { page } })
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async changeStatus(id: number): Promise<void> {
    return axiosInstance
      .patch(`/users/change-status/${id}`)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
