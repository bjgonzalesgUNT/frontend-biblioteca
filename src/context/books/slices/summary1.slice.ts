import { Summary1Model } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Summary1Model[] = [];

export const summaries1Slice = createSlice({
  name: "summary1",
  initialState,
  reducers: {
    setSummaries1: (state, action: PayloadAction<Summary1Model[]>) => {
      return action.payload;
    },
  },
});

export const { setSummaries1 } = summaries1Slice.actions;
