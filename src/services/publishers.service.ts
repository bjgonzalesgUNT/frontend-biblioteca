import { throwHttpErrorHandler } from "@/handlers";
import { PublisherModel } from "@/models";
import { axiosInstance } from "@/tools";

export class PublishersService {
  static async getAll(): Promise<PublisherModel[]> {
    return await axiosInstance
      .get("/publishers/find-all")
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
