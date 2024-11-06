"use client";

import {
  CHANGE_STATUS_ERROR_MESSAGE,
  CHANGE_STATUS_SUCCESS_MESSAGE,
} from "@/constants";
import { AuthorModel } from "@/models";
import { AuthorsService } from "@/services";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { EditAuthor } from "../EditAuthor";

interface Props {
  author: AuthorModel;
  columnKey: keyof AuthorModel | "actions";
}

export const RenderCell = ({ author, columnKey }: Props) => {
  const [state, setState] = useState(!author.deletedAt);

  const handleChangeStatus = async () => {
    try {
      await AuthorsService.changeStatus(author.id);
      setState(!state);
      toast.success(CHANGE_STATUS_SUCCESS_MESSAGE);
    } catch (error) {
      toast.error(CHANGE_STATUS_ERROR_MESSAGE);
    }
  };

  switch (columnKey) {
    case "surnames":
      return <span>{author.surnames}</span>;
    case "names":
      return <span>{author.names}</span>;
    case "nationality":
      return <span>{author.nationality}</span>;
    case "alias":
      return <span>{author.alias}</span>;
    case "deletedAt":
      return <Switch isSelected={state} onChange={handleChangeStatus} />;
    case "actions":
      return <EditAuthor author={author} />;
    default:
      return null;
  }
};
