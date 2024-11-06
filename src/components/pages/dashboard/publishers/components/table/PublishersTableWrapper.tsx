"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";

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
import { columns } from "./data";
import { RenderCell } from "./RenderCell";

interface Props {
  isLoading: boolean;
  total: number;
  totalPages: number;
  page: number;
  count: number;
  setPage: (page: number) => void;
  publishers: PublisherModel[];
}

export const PublishersTableWrapper = (props: Props) => {
  const { isLoading, total, totalPages, page, count, setPage, publishers } =
    props;

  return (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={
        total > 0 ? (
          <div className="flex w-full items-center justify-between gap-2">
            <span className="text-sm text-default-400">
              Mostrando
              <span className="mx-1">
                {(page - 1) * 10 + count} de {total}
              </span>
              resultados
            </span>
            {totalPages > 1 ? (
              <Pagination
                loop
                size="lg"
                showControls
                isCompact
                total={totalPages}
                page={page}
                onChange={setPage}
                initialPage={1}
              />
            ) : null}
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
        items={publishers}
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={TABLE_BODY_EMPTY_MESSAGE}
      >
        {(publisher) => (
          <TableRow>
            {(columnKey: any) => (
              <TableCell>
                <RenderCell publisher={publisher} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
