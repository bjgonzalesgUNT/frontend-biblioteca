import { AuthorModel, PaginationModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaginationContext } from "../interfaces";
import { getAuthorsPaginatedThunk } from "./authors.thunks";

const initialState: IPaginationContext<AuthorModel> = {
  isLoading: false,
  count: 0,
  total: 0,
  currentPage: 0,
  totalPages: 0,
  prev: null,
  next: null,
  rows: [],
};

export const authorsPaginatedSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    addAuthor: (state, action: PayloadAction<AuthorModel>) => {
      state.rows.unshift(action.payload);
    },
    updateAuthor: (state, action: PayloadAction<AuthorModel>) => {
      const index = state.rows.findIndex(
        (author) => author.id === action.payload.id,
      );
      state.rows[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthorsPaginatedThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAuthorsPaginatedThunk.fulfilled,
      (state, action: PayloadAction<PaginationModel<AuthorModel>>) => {
        state.isLoading = false;
        state.count = action.payload.count;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.prev = action.payload.prev;
        state.next = action.payload.next;
        state.rows = action.payload.rows;
      },
    );
    builder.addCase(getAuthorsPaginatedThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { addAuthor, updateAuthor } = authorsPaginatedSlice.actions;
