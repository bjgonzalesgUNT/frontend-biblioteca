"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TableWrapper } from "@/components/table/table";
import { AddUser } from "./add-user";
import { useUsers } from "../hooks/useUsers";
import debounce from "debounce";

export const Accounts = () => {

  const [search, setSearch] = useState('')
  const {users, getUsers, loading, error} = useUsers();

  const debounceUsers = useCallback(debounce(search => getUsers({search}), 300), [getUsers]);

  const handleSearchChange = (newSearch : string) => {
    setSearch(newSearch);
    debounceUsers(newSearch);
  };

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
          <UsersIcon />
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
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Buscar usuarios"
            value={search}
            onValueChange={handleSearchChange}
          />
          {/* <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon /> */}
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <AddUser />
          <Button color="secondary">
            Exportar a CSV
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        {loading && ( <span>Cargando...</span> )}
        {!loading && <TableWrapper users={users} />}
      </div>
    </div>
  );
};
