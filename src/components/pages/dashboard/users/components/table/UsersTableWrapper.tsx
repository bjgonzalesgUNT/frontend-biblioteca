"use client";

import { RowsPerPage } from "@/components/paginate";
import { TABLE_BODY_EMPTY_MESSAGE } from "@/constants";
import { IUsersStore, setUsers } from "@/context/users";
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
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { columns } from "./data";
import { RenderCell } from "./RenderCell";

export const UsersTableWrapper = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();

  const users = useSelector((store: IUsersStore) => store.users);

  const handleGetUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { rows, total, totalPages, currentPage } =
        await UsersService.getAllPaginate(page, limit);
      dispatch(setUsers(rows));
      setPage(currentPage);
      setTotal(total);
      setTotalPages(totalPages);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, dispatch]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={
        users.length > 0 ? (
          <div className="flex w-full items-center justify-between">
            <Pagination
              showControls
              total={totalPages}
              onChange={setPage}
              initialPage={page}
            />
            <RowsPerPage
              limit={limit}
              total={total}
              onChange={(e) =>
                e.target.value && setLimit(Number(e.target.value))
              }
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
