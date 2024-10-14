"use client";

import { useSession } from "@/hooks/useSession";
import { Input, Skeleton } from "@nextui-org/react";

export const UserInformationOption = () => {
  const { user } = useSession();

  return (
    <Skeleton isLoaded={!!user} className="rounded-md">
      <div className="flex w-full flex-col gap-4">
        <Input
          label="Usuario"
          variant="bordered"
          value={user?.username || ""}
          isReadOnly
          isDisabled
        />
        <Input
          label="Rol"
          variant="bordered"
          value={user?.role || ""}
          isReadOnly
          isDisabled
        />
      </div>
    </Skeleton>
  );
};
