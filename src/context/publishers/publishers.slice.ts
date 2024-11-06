import { PublisherModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaginationContext } from "../interfaces";
import { getPublishersPaginatedThunk } from "./publishers.thunks";

const initialState: IPaginationContext<PublisherModel> = {
  isLoading: false,
  count: 0,
  total: 0,
  currentPage: 0,
  totalPages: 0,
  prev: null,
  next: null,
  rows: [],
};

export const publishersPaginatedSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {
    setPublishers: (state, action: PayloadAction<PublisherModel[]>) => {
      state.rows = action.payload;
    },
    addPublisher: (state, action: PayloadAction<PublisherModel>) => {
      state.rows.unshift(action.payload);
    },
    updatePublisher: (state, action: PayloadAction<PublisherModel>) => {
      const index = state.rows.findIndex(
        (publisher) => publisher.id === action.payload.id,
      );
      state.rows[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPublishersPaginatedThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPublishersPaginatedThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.count = action.payload.count;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.prev = action.payload.prev;
      state.next = action.payload.next;
      state.rows = action.payload.rows;
    });
    builder.addCase(getPublishersPaginatedThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { setPublishers, addPublisher, updatePublisher } =
  publishersPaginatedSlice.actions;
