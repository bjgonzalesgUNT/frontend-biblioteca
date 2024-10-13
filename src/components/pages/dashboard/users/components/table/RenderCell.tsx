"use client";

import {
  CHANGE_STATUS_ERROR_MESSAGE,
  CHANGE_STATUS_SUCCESS_MESSAGE,
} from "@/constants";
import { UserModel } from "@/models";
import { UsersService } from "@/services";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  user: UserModel;
  columnKey: keyof UserModel;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey];

  const [state, setState] = useState(user.status);

  const handleChangeStatus = async () => {
    try {
      await UsersService.changeStatus(user.id);
      toast.success(CHANGE_STATUS_SUCCESS_MESSAGE);
    } catch (error) {
      toast.error(CHANGE_STATUS_ERROR_MESSAGE);
    }
  };

  switch (columnKey) {
    case "id":
      return <span>{cellValue}</span>;
    case "username":
      return <span>{cellValue}</span>;
    case "surnames":
      return <span>{cellValue}</span>;
    case "names":
      return <span>{cellValue}</span>;
    case "role":
      return <span>{cellValue}</span>;
    case "status":
      return (
        <Switch
          isSelected={state}
          onValueChange={setState}
          onChange={handleChangeStatus}
        />
      );
    default:
      return <span>{cellValue}</span>;
  }
};
