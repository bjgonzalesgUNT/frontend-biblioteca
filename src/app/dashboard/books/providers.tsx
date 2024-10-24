"use client";

import { booksStore } from "@/context/books";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export const BooksProviders = ({ children }: Props) => {
  return <Provider store={booksStore}>{children}</Provider>;
};
