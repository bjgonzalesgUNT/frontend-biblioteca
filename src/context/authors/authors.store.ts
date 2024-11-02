import { AuthorModel } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { IPaginationContext } from "../interfaces";
import { authorsPaginatedSlice } from "./authors.slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface IAuthorStore {
  authorsPaginated: IPaginationContext<AuthorModel>;
}

export const authorsStore = configureStore<IAuthorStore>({
  reducer: {
    authorsPaginated: authorsPaginatedSlice.reducer,
  },
});

export type AuthorsState = ReturnType<typeof authorsStore.getState>;
export const useAuthorsDispatch: () => typeof authorsStore.dispatch = () =>
  authorsStore.dispatch;
export const useAuthorsSelector: TypedUseSelectorHook<AuthorsState> =
  useSelector;
