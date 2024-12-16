"use client";

import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { setUsers } from "@/context/users";
import { usePagination } from "@/hooks";
import { UserModel } from "@/models";
import { UsersService } from "@/services";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { UsersTableWrapper } from "./components";
import { AddUser } from "./components/AddUser";

export const UsersWrapper = () => {
  const dispatch = useDispatch();

  const { isLoading, total, totalPages, page, setPage } =
    usePagination<UserModel>({
      promise: UsersService.getAllPaginate,
      onSuccess: (data) => dispatch(setUsers(data)),
      onError: (error) => toast.error(error.message),
    });

  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Inicio</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <span>Usuarios</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>Lista</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Lista de Usuarios</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          {/* <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Buscar usuarios"
            value={search}
          /> */}
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <AddUser />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <UsersTableWrapper
          isLoading={isLoading}
          total={total}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
