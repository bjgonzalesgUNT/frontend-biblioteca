import { Summary3Model } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Summary3Model[] = [];

export const summaries3Slice = createSlice({
  name: "summary3",
  initialState,
  reducers: {
    setSummaries3: (state, action: PayloadAction<Summary3Model[]>) => {
      return action.payload;
    },
  },
});

export const { setSummaries3 } = summaries3Slice.actions;
