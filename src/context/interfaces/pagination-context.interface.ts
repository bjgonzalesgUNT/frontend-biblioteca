import { PaginationModel } from "@/models";

export interface IPaginationContext<T> extends PaginationModel<T> {
  isLoading: boolean;
  error?: string;
}
