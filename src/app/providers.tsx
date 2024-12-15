"use client";
import { SessionAuthProvider } from "@/context/auth";
import { SonneProvider } from "@/context/sonne";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <SessionAuthProvider>
      <NextUIProvider>
        <NextThemesProvider
          defaultTheme="dark"
          attribute="class"
          {...themeProps}
        >
          <SonneProvider>{children}</SonneProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionAuthProvider>
  );
}
