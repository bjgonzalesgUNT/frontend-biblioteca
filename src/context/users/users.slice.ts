import { UserModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserModel[] = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserModel[]>) {
      return action.payload;
    },
    addUser(state, action: PayloadAction<UserModel>) {
      state.unshift(action.payload);
    },
  },
});

export const { setUsers, addUser } = usersSlice.actions;
