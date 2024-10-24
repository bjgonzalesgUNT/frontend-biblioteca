import { BookModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: BookModel[] = [];

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookModel[]>) => {
      return action.payload;
    },
    addBook: (state, action: PayloadAction<BookModel>) => {
      state.unshift(action.payload);
    },
    editBook: (state, action: PayloadAction<BookModel>) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

export const { setBooks, addBook, editBook } = booksSlice.actions;
