"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";

import { usePagination } from "@/hooks";
import { PublisherModel } from "@/models";

import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./data";
import { RenderCell } from "./RenderCell";
import { PublishersService } from "@/services";
import { setPublishers } from "@/context/publishers";

export const PublisherTableWrapper = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    total,
    totalPages,
    page,
    setPage,
    data: publishers,
  } = usePagination<PublisherModel>({
    promise: PublishersService.getAllPaginate,
  });

  useEffect(() => {
    dispatch(setPublishers(publishers));
  }, [publishers, dispatch]);

  return (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={
        total > 0 ? (
          <div className="flex w-full items-center justify-start">
            <Pagination
              loop
              size="lg"
              showControls
              total={totalPages}
              page={page}
              onChange={setPage}
              initialPage={1}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={`${column.name == "ACCIONES" ? "flex items-center justify-end pr-8" : ""}`}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={publishers}
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={TABLE_BODY_EMPTY_MESSAGE}
      >
        {(user) => (
          <TableRow>
            {(columnKey: any) => (
              <TableCell>
                <RenderCell publisher={user} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
