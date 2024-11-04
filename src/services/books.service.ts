import { throwHttpErrorHandler } from "@/handlers";
import { BookFormType } from "@/helpers/form-types";
import { BookModel, PaginationModel } from "@/models";
import { axiosInstance } from "@/tools";

export class BooksService {
  static createUrl = "/books/create";
  static findAllPaginateUrl = "/books/find-all-paginate";
  static findByFilterPaginateUrl = "/books/find-by-filter-paginate";
  static updateUrl = "/books/update";
  static changeStatusUrl = "/books/change-status";

  static async create(data: BookFormType): Promise<BookModel> {
    const { summary_1_id, summary_2_id, ...rest } = data;

    return axiosInstance
      .post(this.createUrl, rest)
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAllPaginate(
    page: number,
  ): Promise<PaginationModel<BookModel>> {
    return axiosInstance
      .get(this.findAllPaginateUrl, { params: { page } })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async update(
    id: number | string,
    data: BookFormType,
  ): Promise<BookModel> {
    const { summary_1_id, summary_2_id, ...rest } = data;
    return axiosInstance
      .patch(`${this.updateUrl}/${id}`, rest)
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
