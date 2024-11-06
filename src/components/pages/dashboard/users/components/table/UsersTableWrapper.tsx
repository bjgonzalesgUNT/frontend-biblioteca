"use client";

import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";
import { setUsers } from "@/context/users";
import { usePagination } from "@/hooks";
import { UserModel } from "@/models";
import { UsersService } from "@/services";
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

export const UsersTableWrapper = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    total,
    totalPages,
    page,
    setPage,
    data: users,
  } = usePagination<UserModel>({ promise: UsersService.getAllPaginate });

  useEffect(() => {
    dispatch(setUsers(users));
  }, [users, dispatch]);

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
