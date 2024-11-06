import { Image } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { useSidebarContext } from "../layout/dashboard/layout-context";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";
import { BooksIcon } from "../icons";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="sticky top-0 z-[20] h-screen">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
          className: "w-80 max-w-xs",
        })}
      >
        <div className={Sidebar.Header()}>
          <Image
            alt="background"
            src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Inicio"
              icon={<HomeIcon />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Administrador">
              <SidebarItem
                isActive={pathname === "/dashboard/users"}
                title="Usuarios"
                icon={<AccountsIcon />}
                href="/dashboard/users"
              />

              <SidebarItem
                isActive={pathname === "/dashboard/books"}
                title="Libros"
                icon={<BooksIcon />}
                href="/dashboard/books"
              />
              <SidebarItem
                isActive={pathname === "/dashboard/publishers"}
                title="Editoriales"
                icon={<BooksIcon />}
                href="/dashboard/publishers"
              />

              <SidebarItem
                isActive={pathname === "/dashboard/authors"}
                title="Autores"
                icon={<AccountsIcon />}
                href="/dashboard/authors"
              />

              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              /> */}
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
