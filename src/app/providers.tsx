"use client";
import { SessionAuthProvider } from "@/context/auth";
import { SonneProvider } from "@/context/sonne";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const { theme } = useTheme();

  return (
    <SessionAuthProvider>
      <NextUIProvider>
        <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          {...themeProps}
        >
          <SonneProvider>{children}</SonneProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionAuthProvider>
  );
}
