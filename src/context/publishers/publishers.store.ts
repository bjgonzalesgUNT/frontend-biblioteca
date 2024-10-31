import { PublisherModel } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { publishersSlice } from "./publishers.slice";

export interface IPublishersStore {
  publishers: PublisherModel[];
}
export const publishersStore = configureStore<IPublishersStore>({
  reducer: {
    publishers: publishersSlice.reducer,
  },
});
