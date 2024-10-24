import { getHttpErrorHandler, throwHttpErrorHandler } from "@/handlers";
import { BookFormType } from "@/helpers/form-types";
import { BookModel, PaginationModel } from "@/models";
import { axiosInstance } from "@/tools";

export class BooksService {
  static async create(data: BookFormType): Promise<BookModel> {
    const { summary_1_id, summary_2_id, ...rest } = data;

    return axiosInstance
      .post("/books/create", rest)
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAllPaginate(
    page: number,
  ): Promise<PaginationModel<BookModel>> {
    return axiosInstance
      .get("/books/find-all-paginate", { params: { page } })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async changeStatus(id: number): Promise<void> {
    return axiosInstance
      .patch(`/books/change-status/${id}`)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
