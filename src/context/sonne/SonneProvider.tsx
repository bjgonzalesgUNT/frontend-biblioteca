"use client";

import { useTheme } from "next-themes";
import { Fragment } from "react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export function SonneProvider({ children }: Props) {
  const { theme } = useTheme();
  return (
    <Fragment>
      <Toaster
        theme={(theme as "dark" | "light") ?? "system"}
        closeButton
        richColors
      />
      {children}
    </Fragment>
  );
}
