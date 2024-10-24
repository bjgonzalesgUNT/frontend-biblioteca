import { TimestampModel } from "./timestamp.model";

export interface PublisherModel extends TimestampModel {
  id: number;
  name: string;
}
