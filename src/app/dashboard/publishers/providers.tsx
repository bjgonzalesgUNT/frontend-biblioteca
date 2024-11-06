"use client";
import { publishersStore } from "@/context/publishers";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export const PublishersProviders = ({ children }: Props) => {
  return <Provider store={publishersStore}>{children}</Provider>;
};
