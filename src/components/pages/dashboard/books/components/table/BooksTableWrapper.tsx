"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";
import { setBooks } from "@/context/books";
import { usePagination } from "@/hooks";
import { BookModel } from "@/models";
import { BooksService } from "@/services";
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

export const BooksTableWrapper = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    total,
    totalPages,
    page,
    setPage,
    data: books,
  } = usePagination<BookModel>({
    promise: BooksService.getAllPaginate,
  });

  useEffect(() => {
    dispatch(setBooks(books));
  }, [books, dispatch]);

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
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody
        items={books}
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={TABLE_BODY_EMPTY_MESSAGE}
      >
        {(user) => (
          <TableRow>
            {(columnKey: any) => (
              <TableCell>
                <RenderCell book={user} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
