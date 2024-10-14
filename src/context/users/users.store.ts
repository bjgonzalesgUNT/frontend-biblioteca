import { UserModel } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./users.slice";

export interface IUsersStore {
  users: UserModel[];
}

export const usersStore = configureStore<IUsersStore>({
  reducer: {
    users: usersSlice.reducer,
  },
});
