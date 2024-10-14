"use client";

interface SessionAuthProviderProps {
  children: React.ReactNode;
}

export const SessionAuthProvider = ({ children }: SessionAuthProviderProps) => {
  return <div>{children}</div>;
};
