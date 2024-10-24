"use client";

import { EditIcon } from "@/components/icons/table/edit-icon";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import {
  CHANGE_STATUS_ERROR_MESSAGE,
  CHANGE_STATUS_SUCCESS_MESSAGE,
} from "@/constants";
import { BookModel } from "@/models";
import { BooksService } from "@/services";
import { Button, Switch, Tooltip } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

interface Props {
  book: BookModel;
  columnKey: keyof BookModel | "actions";
}

export const RenderCell = ({ book, columnKey }: Props) => {
  const [state, setState] = useState(!book.deletedAt);

  const handleChangeStatus = async () => {
    try {
      await BooksService.changeStatus(book.id);
      setState(!state);
      toast.success(CHANGE_STATUS_SUCCESS_MESSAGE);
    } catch (error) {
      toast.error(CHANGE_STATUS_ERROR_MESSAGE);
    }
  };

  switch (columnKey) {
    case "title":
      return <span>{book.title}</span>;
    case "author":
      return <span>{book.author.alias}</span>;
    case "deway":
      return <span>{book.deway.description}</span>;
    case "publisher":
      return <span>{book.publisher.name}</span>;
    case "deletedAt":
      return <Switch isSelected={state} onChange={handleChangeStatus} />;
    case "actions":
      return (
        <div className="space-x-2">
          <Tooltip content="Ver libro" color="success">
            <Button isIconOnly color="success" aria-label="ver libro">
              <EyeIcon fill="black" />
            </Button>
          </Tooltip>
          <Tooltip content="Editar libro" color="warning">
            <Button isIconOnly color="warning" aria-label="editar libro">
              <EditIcon fill="black" />
            </Button>
          </Tooltip>
        </div>
      );
  }
};
