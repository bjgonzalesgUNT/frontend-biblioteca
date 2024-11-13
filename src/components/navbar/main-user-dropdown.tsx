import { useSession } from "@/hooks/useSession";
import { singOut } from "@/lib";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  Skeleton,
  User,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { DarkModeSwitch } from "./darkmodeswitch";

export const MainUserDropdown = () => {
  const router = useRouter();

  const { user } = useSession();

  const handleLogout = useCallback(async () => {
    await singOut();
    router.replace("/");
  }, [router]);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <User
            name={user?.username}
            description={user?.role}
            className="cursor-pointer"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="Menu de acciones de usuario">
        <DropdownItem key="profile" href="/dashboard/profile">
          Perfil
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Salir
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
