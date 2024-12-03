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
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const MainUserDropdown = () => {
  const router = useRouter();

  const { session } = useSession();

  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    router.replace("/");
  }, [router]);

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
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Salir
        </DropdownItem>
        {/* <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};
