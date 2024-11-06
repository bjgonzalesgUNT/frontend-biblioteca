"use client";

import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import {
  CHANGE_STATUS_ERROR_MESSAGE,
  CHANGE_STATUS_SUCCESS_MESSAGE,
} from "@/constants";
import { PublisherModel } from "@/models";
import { BooksService } from "@/services";
import { Button, Switch, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  publisher: PublisherModel;
  columnKey: keyof PublisherModel | "actions";
}

export const RenderCell = ({ publisher, columnKey }: Props) => {
  const [state, setState] = useState(!publisher.deletedAt);
  const handleChangeStatus = async () => {
    try {
      await BooksService.changeStatus(publisher.id);
      setState(!state);
      toast.success(CHANGE_STATUS_SUCCESS_MESSAGE);
    } catch (error) {
      toast.error(CHANGE_STATUS_ERROR_MESSAGE);
    }
  };

  switch (columnKey) {
    case "name":
      return <span>{publisher.name}</span>;
    case "deletedAt":
      return <Switch isSelected={state} onChange={handleChangeStatus} />;
    case "actions":
      return (
        <div className="flex justify-end space-x-2">
          <Tooltip content="Ver editorial" color="success">
            <Button isIconOnly color="success" aria-label="ver editorial">
              <EyeIcon fill="black" />
            </Button>
          </Tooltip>
          <Tooltip content="Editar editorial" color="warning">
            <Button isIconOnly color="warning" aria-label="editar editorial">
              <EditIcon fill="black" />
            </Button>
          </Tooltip>
        </div>
      );
    default:
      return null;
  }
};
