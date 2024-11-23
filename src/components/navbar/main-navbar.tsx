import { Image, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { MainUserDropdown } from "./main-user-dropdown";

interface Props {
  children: React.ReactNode;
}

export const MainNavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-1 select-none flex-col">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent>
          <Image src="/imgs/info-logo.png" alt="info-logo" width={40} />
          <p className="text-2xl font-bold uppercase tracking-tight">
            {"BIB"}
            <span className="text-blue-500">{"TEC"}</span>
            {" - INFORMATICA"}
          </p>
        </NavbarContent>

        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <MainUserDropdown />
        </NavbarContent>
      </Navbar>
      <div className="pb-8 pt-2">{children}</div>
    </div>
  );
};
