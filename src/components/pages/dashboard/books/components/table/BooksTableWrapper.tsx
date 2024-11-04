"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";
import { BookModel } from "@/models";
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
import { columns } from "./data";
import { RenderCell } from "./RenderCell";

interface Props {
  isLoading: boolean;
  total: number;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  books: BookModel[];
}

export const BooksTableWrapper = (props: Props) => {
  const { isLoading, totalPages, page, setPage, books } = props;

  return (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={
        totalPages > 1 ? (
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
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
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
