import { PublisherModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PublisherModel[] = [];

export const publishersSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {
    setPublishers: (state, action: PayloadAction<PublisherModel[]>) => {
      return action.payload;
    },
  },
});

export const { setPublishers } = publishersSlice.actions;
