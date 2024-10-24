import { AuthorModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthorModel[] = [];

export const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (state, action: PayloadAction<AuthorModel[]>) => {
      return action.payload;
    },
  },
});

export const { setAuthors } = authorsSlice.actions;
