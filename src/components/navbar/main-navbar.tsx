import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { MainUserDropdown } from "./main-user-dropdown";

interface Props {
  children: React.ReactNode;
}

export const MainNavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent>logo</NavbarContent>

        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <MainUserDropdown />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
