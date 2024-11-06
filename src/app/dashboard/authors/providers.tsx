"use client";

import { authorsStore } from "@/context/authors";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export const AuthorsProvider = ({ children }: Props) => {
  return <Provider store={authorsStore}>{children}</Provider>;
};
