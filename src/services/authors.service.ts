import { throwHttpErrorHandler } from "@/handlers";
import { AuthorFormType } from "@/helpers/form-types/author.form-type";
import { AuthorModel, PaginationModel } from "@/models";
import { axiosInstance } from "@/tools";

export class AuthorsService {
  static createUrl = "/authors/create";
  static getAllUrl = "/authors/find-all";
  static getAllPaginatedUrl = "/authors/find-all-paginate";
  static getByFilterPaginatedUrl = "/authors/find-by-filter-paginate";
  static updateUrl = "/authors/update";
  static changeStatusUrl = "/authors/change-status";

  static async create(data: AuthorFormType): Promise<AuthorModel> {
    return axiosInstance
      .post(this.createUrl, data)
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }
  static async getAll(): Promise<AuthorModel[]> {
    return axiosInstance
      .get(this.getAllUrl)
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAllPaginated(
    page: number,
  ): Promise<PaginationModel<AuthorModel>> {
    return axiosInstance
      .get(this.getAllPaginatedUrl, { params: { page } })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async update(
    id: number,
    body: any,
    signal?: AbortSignal,
  ): Promise<AuthorModel> {
    return axiosInstance
      .patch(`${this.updateUrl}/${id}`, body, { signal })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async changeStatus(id: number): Promise<void> {
    return axiosInstance
      .patch(`${this.changeStatusUrl}/${id}`)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
