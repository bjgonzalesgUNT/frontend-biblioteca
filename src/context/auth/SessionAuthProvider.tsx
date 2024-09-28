"use client";

import { SessionProvider } from "next-auth/react";

interface SessionAuthProviderProps {
  children: React.ReactNode;
}

export const SessionAuthProvider = ({ children }: SessionAuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
