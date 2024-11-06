import { BookModel } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IPaginationContext } from "../interfaces";
import { booksPaginatedSlice } from "./slices";

export interface IBooksStore {
  booksPaginated: IPaginationContext<BookModel>;
}

export const booksStore = configureStore<IBooksStore>({
  reducer: {
    booksPaginated: booksPaginatedSlice.reducer,
  },
});

export type BooksStore = ReturnType<typeof booksStore.getState>;
export const useBooksDispatch: () => typeof booksStore.dispatch = () =>
  booksStore.dispatch;
export const useBooksSelector: TypedUseSelectorHook<BooksStore> = useSelector;
