import {
  AuthorModel,
  BookModel,
  Publisher,
  Summary1Model,
  Summary2Model,
  Summary3Model,
} from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import {
  booksSlice,
  summaries1Slice,
  summaries2Slice,
  summaries3Slice,
} from "./slices";
import { publishersSlice } from "../publishers";

export interface IBooksStore {
  books: BookModel[];
  summaries1: Summary1Model[];
  summaries2: Summary2Model[];
  summaries3: Summary3Model[];
  // authors: AuthorModel[];
  publishers: Publisher[];
}

export const booksStore = configureStore<IBooksStore>({
  reducer: {
    books: booksSlice.reducer,
    summaries1: summaries1Slice.reducer,
    summaries2: summaries2Slice.reducer,
    summaries3: summaries3Slice.reducer,
    // authors: authorsSlice.reducer,
    publishers: publishersSlice.reducer,
  },
});
