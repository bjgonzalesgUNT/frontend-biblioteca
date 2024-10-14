export interface PaginationModel<T> {
  count: number;
  total: number;
  currentPage: number;
  totalPages: number;
  prev: string | null;
  next: string | null;
  rows: T[];
}

export interface ICreatePagination {
  page?: number;
  limit?: number;
}
