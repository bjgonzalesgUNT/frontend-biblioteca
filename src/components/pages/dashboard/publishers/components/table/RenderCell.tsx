"use client";

import {
  CHANGE_STATUS_ERROR_MESSAGE,
  CHANGE_STATUS_SUCCESS_MESSAGE,
} from "@/constants";
import { PublisherModel } from "@/models";
import { BooksService } from "@/services";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { EditPublisher } from "../EditPublisher";

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
      return <EditPublisher publisher={publisher} />;
    default:
      return null;
  }
};
