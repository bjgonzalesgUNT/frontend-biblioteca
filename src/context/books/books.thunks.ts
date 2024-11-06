import { throwHttpErrorHandler } from "@/handlers";
import { axiosInstance } from "@/tools";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Props {
  page: number;
  url: string;
}

export const getBooksPaginated = createAsyncThunk(
  "books/getBooksPaginated",
  async ({ page, url }: Props) => {
    return await axiosInstance
      .get(url, { params: { page } })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  },
);
