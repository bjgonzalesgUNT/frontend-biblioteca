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
    addAuthor: (state, action: PayloadAction<AuthorModel>) => {
      state.unshift(action.payload);
    },
    editAuthor: (state, action: PayloadAction<AuthorModel>) => {
      const index = state.findIndex(
        (author) => author.id === action.payload.id,
      );
      state[index] = action.payload;
    },
  },
});

export const { setAuthors, addAuthor, editAuthor } = authorsSlice.actions;
