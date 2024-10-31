import { throwHttpErrorHandler } from "@/handlers";
import { PublisherFormType } from "@/helpers/form-types/publisher.form-type";
import { PaginationModel, PublisherModel } from "@/models";
import { axiosInstance } from "@/tools";

export class PublishersService {
  static async create(data: PublisherFormType): Promise<PublisherModel> {
    return await axiosInstance
      .post("/publishers/create", data)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAll(): Promise<PublisherModel[]> {
    return await axiosInstance
      .get("/publishers/find-all")
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
  static async getAllPaginate(
    page: number,
  ): Promise<PaginationModel<PublisherModel>> {
    return await axiosInstance
      .get("/publishers/find-all-paginate", { params: { page } })
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
  static async changeStatus(id: string): Promise<void> {
    return axiosInstance
      .patch(`/publishers/change-status/${id}`)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
