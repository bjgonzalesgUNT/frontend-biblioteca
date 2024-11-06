import { DateValue } from "@nextui-org/react";

export interface BookFormType {
  title: string;
  summary_1_id: string;
  summary_2_id: string;
  deway_id: string;
  author_id: string;
  publisher_id: string;
  description: string;
  pages: string;
  edition: string;
  image_url?: string;
  path?: string;
  published_at: DateValue | undefined;
}
