import {
  BookModel,
  Publisher,
  Summary1Model,
  Summary2Model,
  Summary3Model,
} from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IPaginationContext } from "../interfaces";
import { publishersSlice } from "../publishers";
import {
  booksPaginatedSlice,
  summaries1Slice,
  summaries2Slice,
  summaries3Slice,
} from "./slices";

export interface IBooksStore {
  booksPaginated: IPaginationContext<BookModel>;
  summaries1: Summary1Model[];
  summaries2: Summary2Model[];
  summaries3: Summary3Model[];
  // authors: AuthorModel[];
  publishers: Publisher[];
}

export const booksStore = configureStore<IBooksStore>({
  reducer: {
    booksPaginated: booksPaginatedSlice.reducer,
    summaries1: summaries1Slice.reducer,
    summaries2: summaries2Slice.reducer,
    summaries3: summaries3Slice.reducer,
    // authors: authorsSlice.reducer,
    publishers: publishersSlice.reducer,
  },
});

export type BooksStore = ReturnType<typeof booksStore.getState>;
export const useBooksDispatch: () => typeof booksStore.dispatch = () =>
  booksStore.dispatch;
export const useBooksSelector: TypedUseSelectorHook<BooksStore> = useSelector;
