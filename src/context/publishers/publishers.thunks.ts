import { throwHttpErrorHandler } from "@/handlers";
import { axiosInstance } from "@/tools";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Props {
  url: string;
  page: number;
}

export const getPublishersPaginatedThunk = createAsyncThunk(
  "publishers/getPublishersPaginated",
  async ({ url, page }: Props) => {
    return await axiosInstance
      .get(url, { params: { page } })
      .then((res) => res.data)
      .catch(throwHttpErrorHandler);
  },
);
