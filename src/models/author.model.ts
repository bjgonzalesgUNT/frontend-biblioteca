import { TimestampModel } from "./timestamp.model";

export interface AuthorModel extends TimestampModel {
  id: number;
  surnames: string;
  names: string;
  nationality: string;
  gender: string;
  alias: string;
  image_url?: string;
}
