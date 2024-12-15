"use client";

import { useSession } from "@/hooks/useSession";
import { Input, Skeleton } from "@nextui-org/react";

export const UserInformationOption = () => {
  const { session } = useSession();

  return (
    <Skeleton isLoaded={!!session?.user} className="rounded-md">
      <div className="flex w-full flex-col gap-4">
        <Input
          label="Usuario"
          variant="bordered"
          value={session?.user.username || ""}
          isReadOnly
          isDisabled
        />
        <Input
          label="Rol"
          variant="bordered"
          value={session?.user?.role || ""}
          isReadOnly
          isDisabled
        />
      </div>
    </Skeleton>
  );
};
