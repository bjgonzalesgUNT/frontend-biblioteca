import { IPaginationContext } from "@/context/interfaces";
import { BookModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBooksPaginated } from "../books.thunks";

const initialState: IPaginationContext<BookModel> = {
  isLoading: false,
  count: 0,
  total: 0,
  currentPage: 0,
  totalPages: 0,
  prev: null,
  next: null,
  rows: [],
};

export const booksPaginatedSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookModel[]>) => {
      state.rows = action.payload;
    },
    addBook: (state, action: PayloadAction<BookModel>) => {
      state.rows.unshift(action.payload);
    },
    editBook: (state, action: PayloadAction<BookModel>) => {
      const index = state.rows.findIndex(
        (book) => book.id === action.payload.id,
      );
      state.rows[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooksPaginated.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBooksPaginated.fulfilled, (state, action) => {
      state.isLoading = false;
      state.count = action.payload.count;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.prev = action.payload.prev;
      state.next = action.payload.next;
      state.rows = action.payload.rows;
    });
    builder.addCase(getBooksPaginated.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const { setBooks, addBook, editBook } = booksPaginatedSlice.actions;
