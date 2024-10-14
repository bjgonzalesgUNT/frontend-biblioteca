"use client";

import { profileStore } from "@/context/profile";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export const ProfileProviders = ({ children }: Props) => {
  return <Provider store={profileStore}>{children}</Provider>;
};
