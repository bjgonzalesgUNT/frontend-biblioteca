"use client";

import { deleteAuthCookie } from "@/actions";
import { useSession } from "@/hooks/useSession";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  User,
} from "@nextui-org/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const UserDropdown = () => {
  const router = useRouter();

  const { session, setSession } = useSession();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    setSession(null);
    router.replace("/");
  }, [router, setSession]);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <User
            name={session?.user?.username}
            description={session?.user?.role}
            className="cursor-pointer"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="Menu de acciones de usuario">
        <DropdownItem
          key="profile"
          href={
            session?.user?.role === "admin" ? "/dashboard/profile" : "/profile"
          }
          className={clsx(
            !session?.user || session?.user?.role !== "admin"
              ? "hidden"
              : "block",
          )}
        >
          Perfil
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className={clsx(!session?.user ? "hidden" : "block text-danger")}
          onPress={handleLogout}
        >
          Salir
        </DropdownItem>

        <DropdownItem
          key="login"
          href="/login"
          className={clsx(session?.user ? "hidden" : "block")}
        >
          Iniciar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
