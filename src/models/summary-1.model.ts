import { TimestampModel } from "./timestamp.model";

export interface Summary1Model extends TimestampModel {
  id: number;
  code: string;
  description: string;
}
