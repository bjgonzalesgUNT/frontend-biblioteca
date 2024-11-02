"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";
import { AuthorModel } from "@/models";
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
  authors: AuthorModel[];
}

export const AuthorsTableWrapper = (props: Props) => {
  const { authors, isLoading, page, setPage, total, totalPages } = props;

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
            align={column.uid === "actions" ? "center" : "start"}
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
