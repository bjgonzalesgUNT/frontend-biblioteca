import { AddPublisher } from "@/components/pages/dashboard/publishers/components/AddPublisher";
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
    addPublisher: (state, action: PayloadAction<PublisherModel>) => {
      state.unshift(action.payload);
    },
    editPublisher: (state, action: PayloadAction<PublisherModel>) => {
      const index = state.findIndex(
        (publisher) => publisher.id === action.payload.id,
      );
      state[index] = action.payload;
    },
  },
});
export const { setPublishers, addPublisher, editPublisher } =
  publishersSlice.actions;
