"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";
import { setAuthors } from "@/context/authors";
import { usePagination } from "@/hooks";
import { AuthorModel } from "@/models";
import { AuthorsService } from "@/services";
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

export const AuthorTableWrapper = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    total,
    totalPages,
    page,
    setPage,
    data: authors,
  } = usePagination<AuthorModel>({
    promise: AuthorsService.getAllPaginate,
  });

  useEffect(() => {
    dispatch(setAuthors(authors));
  }, [authors, dispatch]);

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
      {
        <TableBody
          items={authors}
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent={TABLE_BODY_EMPTY_MESSAGE}
        >
          {(user) => (
            <TableRow>
              {(columnKey: any) => (
                <TableCell>
                  <RenderCell author={user} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      }
    </Table>
  );
};
