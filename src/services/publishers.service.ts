import { throwHttpErrorHandler } from "@/handlers";
import { PublisherFormType } from "@/helpers/form-types/publisher.form-type";
import { PaginationModel, PublisherModel } from "@/models";
import { axiosInstance } from "@/tools";

export class PublishersService {
  static createUrl = "/publishers/create";
  static getAllUrl = "/publishers/find-all";
  static getAllPaginateUrl = "/publishers/find-all-paginate";
  static getByNamePaginateUrl = "/publishers/find-by-name-paginate";
  static changeStatusUrl = "/publishers/change-status";
  static updateUrl = "/publishers/update";

  static async create(data: PublisherFormType): Promise<PublisherModel> {
    return await axiosInstance
      .post(this.createUrl, data)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAll(): Promise<PublisherModel[]> {
    return await axiosInstance
      .get(this.getAllUrl)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async getAllPaginate(
    page: number,
  ): Promise<PaginationModel<PublisherModel>> {
    return await axiosInstance
      .get(this.getAllPaginateUrl, { params: { page } })
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async update(
    id: number | string,
    data: PublisherFormType,
  ): Promise<PublisherModel> {
    return await axiosInstance
      .patch(`${this.updateUrl}/${id}`, data)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async changeStatus(id: string): Promise<void> {
    return axiosInstance
      .patch(`${this.changeStatusUrl}/${id}`)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
