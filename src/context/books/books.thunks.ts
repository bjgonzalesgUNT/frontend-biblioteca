import { BooksService } from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Props {
  url: string;
  page: number;
}

export const getBooksPaginated = createAsyncThunk(
  "books/getBooksPaginated",
  async ({ page, url }: Props) =>
    BooksService.getByFilterPaginatedByUrl({ page, url }),
);
