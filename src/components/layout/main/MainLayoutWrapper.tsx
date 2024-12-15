"use client";

import { MainNavbarWrapper } from "@/components/navbar";
import React from "react";
import { useLockedBody } from "../../../hooks/useBodyLock";
import { SidebarContext } from "./main-layout-context";

interface Props {
  children: React.ReactNode;
}

export const MainLayoutWrapper = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <MainNavbarWrapper>{children}</MainNavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
