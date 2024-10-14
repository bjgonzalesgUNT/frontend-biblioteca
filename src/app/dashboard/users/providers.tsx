"use client";

import { usersStore } from "@/context/users";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export const UsersProviders = ({ children }: Props) => {
  return <Provider store={usersStore}>{children}</Provider>;
};
