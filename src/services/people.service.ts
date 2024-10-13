import { throwHttpErrorHandler } from "@/handlers";
import { PersonFormType } from "@/helpers/form-types";
import { PersonModel } from "@/models";
import { axiosInstance } from "@/tools";

export class PeopleService {
  static async createOne(values: PersonFormType): Promise<PersonModel> {
    return axiosInstance
      .post("/people/create", values)
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  }
}
