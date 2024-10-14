import { throwHttpErrorHandler } from "@/handlers";
import { PersonFormType, UpdatePersonFormType } from "@/helpers/form-types";
import { PersonModel } from "@/models";
import { axiosInstance } from "@/tools";

export class PeopleService {
  static async createOne(values: PersonFormType): Promise<PersonModel> {
    return axiosInstance
      .post("/people/create", values)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async findOneByDocument(): Promise<PersonModel> {
    return axiosInstance
      .get("/people/find-one-by-document")
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }

  static async updateOne(values: UpdatePersonFormType): Promise<PersonModel> {
    return axiosInstance
      .patch("/people/update", values)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
