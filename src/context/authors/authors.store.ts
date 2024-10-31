import { AuthorModel } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { authorsSlice } from "./authors.slice";

export interface IAuthorStore {
  authors: AuthorModel[];
}

export const authorsStore = configureStore<IAuthorStore>({
  reducer: {
    authors: authorsSlice.reducer,
  },
});
