import { throwHttpErrorHandler } from "@/handlers";
import { AuthorModel } from "@/models";
import { axiosInstance } from "@/tools";

export class AuthorsService {
  static async getAll(): Promise<AuthorModel[]> {
    return axiosInstance
      .get("/authors/find-all")
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }
}
