import { DateValue } from "@nextui-org/react";
import { Summary3Model } from "./summary-3.model";
import { TimestampModel } from "./timestamp.model";

export interface BookModel extends TimestampModel {
  id: number;
  title: string;
  deway_id: number;
  author_id: number;
  publisher_id: number;
  description: string;
  pages: number;
  edition: number;
  path: string;
  image_url: string;
  published_at: string;
  deway: Summary3Model;
  author: Author;
  publisher: Publisher;
}

export interface Author extends TimestampModel {
  id: number;
  surnames: string;
  names: string;
  nationality: string;
  gender: string;
  alias: string;
  image_url: string;
}

export interface Publisher extends TimestampModel {
  id: number;
  name: string;
}
