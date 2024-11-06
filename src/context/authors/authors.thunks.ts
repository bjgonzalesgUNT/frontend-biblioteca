import { throwHttpErrorHandler } from "@/handlers";
import { AuthorModel, PaginationModel } from "@/models";
import { axiosInstance } from "@/tools";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Props {
  url: string;
  page: number;
}

export const getAuthorsPaginatedThunk = createAsyncThunk(
  "authors/getAuthors",
  async ({ url, page }: Props): Promise<PaginationModel<AuthorModel>> => {
    return axiosInstance
      .get(url, { params: { page } })
      .then((response) => response.data)
      .catch(throwHttpErrorHandler);
  },
);
