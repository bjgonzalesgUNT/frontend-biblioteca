import { PersonModel } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { profileSlice } from "./profile.slice";

export interface IProfileStore {
  profile: PersonModel;
}

export const profileStore = configureStore<IProfileStore>({
  reducer: {
    profile: profileSlice.reducer,
  },
});
