import { throwHttpErrorHandler } from "@/handlers";
import { AuthorFormType } from "@/helpers/form-types/author.form-type";
import { AuthorModel, PaginationModel } from "@/models";
import { axiosInstance } from "@/tools";

export class AuthorsService {
  static async create(data: AuthorFormType): Promise<AuthorModel> {
    return axiosInstance
      .post("/authors/create", data)
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }
  static async getAll(): Promise<AuthorModel[]> {
    return axiosInstance
      .get("/authors/find-all")
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAllPaginate(
    page: number,
  ): Promise<PaginationModel<AuthorModel>> {
    return axiosInstance
      .get("/authors/find-all-paginate", { params: { page } })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async changeStatus(id: number): Promise<void> {
    return axiosInstance
      .patch(`/authors/change-status/${id}`)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
