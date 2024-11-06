import { PublisherModel } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IPaginationContext } from "../interfaces";
import { publishersPaginatedSlice } from "./publishers.slice";

export interface IPublishersStore {
  publishersPaginated: IPaginationContext<PublisherModel>;
}
export const publishersStore = configureStore<IPublishersStore>({
  reducer: {
    publishersPaginated: publishersPaginatedSlice.reducer,
  },
});

export type PublishersStore = ReturnType<typeof publishersStore.getState>;
export const usePublishersDispatch: () => typeof publishersStore.dispatch =
  () => publishersStore.dispatch;
export const usePublishersSelector: TypedUseSelectorHook<PublishersStore> =
  useSelector;
