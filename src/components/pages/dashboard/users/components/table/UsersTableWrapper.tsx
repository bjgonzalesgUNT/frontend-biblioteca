"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";
import { IUsersStore } from "@/context/users";
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
import { useSelector } from "react-redux";
import { columns } from "./data";
import { RenderCell } from "./RenderCell";

interface Props {
  isLoading: boolean;
  total: number;
  totalPages: number;
  page: number;
  setPage: any;
}

export const UsersTableWrapper = (props: Props) => {
  const { isLoading, total, totalPages, page, setPage } = props;

  const users = useSelector((state: IUsersStore) => state.users);

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
        items={users}
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent={TABLE_BODY_EMPTY_MESSAGE}
      >
        {(user) => (
          <TableRow>
            {(columnKey: any) => (
              <TableCell>
                <RenderCell user={user} columnKey={columnKey} />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
