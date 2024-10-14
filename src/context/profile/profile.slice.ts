import { PersonModel } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PersonModel = {
  id: 0,
  surnames: "",
  names: "",
  document: "",
  gender: "",
  nacionality: "",
  date: "",
  telephone: "",
  address: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<PersonModel>) => {
      return action.payload;
    },
    updateProfile: (state, action: PayloadAction<PersonModel>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;
