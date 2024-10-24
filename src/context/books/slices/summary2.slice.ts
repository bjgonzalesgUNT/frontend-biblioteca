import { Summary2Model } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Summary2Model[] = [];

export const summaries2Slice = createSlice({
  name: "summary2",
  initialState,
  reducers: {
    setSummaries2: (state, action: PayloadAction<Summary2Model[]>) => {
      return action.payload;
    },
  },
});

export const { setSummaries2 } = summaries2Slice.actions;
