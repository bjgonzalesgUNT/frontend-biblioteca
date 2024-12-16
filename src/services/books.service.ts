import { throwHttpErrorHandler } from "@/handlers";
import { BookFormType } from "@/helpers/form-types";
import { BookModel, PaginationModel } from "@/models";
import { axiosInstance } from "@/tools";

export class BooksService {
  static createUrl = "/books/create";
  static getAllPaginateUrl = "/books/find-all-paginate";
  static getByFilterPaginateUrl = "/books/find-by-filter-paginate";
  static updateUrl = "/books/update";
  static changeStatusUrl = "/books/change-status";
  static getByFilterPublicPaginateUrl = "/books/find-by-filter-public-paginate";

  static async create(data: BookFormType): Promise<BookModel> {
    const { summary_1_id, summary_2_id, ...rest } = data;

    return axiosInstance
      .post(this.createUrl, rest)
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAllPaginate(
    page: number,
    limit?: number,
  ): Promise<PaginationModel<BookModel>> {
    return axiosInstance
      .get(this.getAllPaginateUrl, { params: { page, limit } })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getByFilterPublicPaginated({
    filter,
    page,
    limit,
  }: {
    filter?: string;
    page: number;
    limit?: number;
  }) {
    return axiosInstance
      .get(this.getByFilterPublicPaginateUrl, {
        params: { filter, page, limit },
      })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getByFilterPaginatedByUrl({
    url,
    page,
    limit,
  }: {
    url: string;
    page: number;
    limit?: number;
  }) {
    return axiosInstance
      .get(url, { params: { page, limit } })
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
