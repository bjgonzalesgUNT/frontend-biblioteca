import { throwHttpErrorHandler } from "@/handlers";
import { Summary1Model, Summary2Model, Summary3Model } from "@/models";
import { axiosInstance } from "@/tools";

export class SummariesService {
  static async getS1(): Promise<Summary1Model[]> {
    return await axiosInstance
      .get("/summaries/find-all-s1")
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getS2(): Promise<Summary2Model[]> {
    return await axiosInstance
      .get("/summaries/find-all-s2")
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }

  static async getS3(): Promise<Summary3Model[]> {
    return await axiosInstance
      .get("/summaries/find-all-s3")
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  }
}
