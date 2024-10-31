"use client";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Input,
  Skeleton,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { AddAuthor, AuthorTableWrapper } from "./components";

export const AuthorsWrapper = () => {
  const pathname = usePathname();

  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <Breadcrumbs>
        {pathname.split("/").map((path, index, pathname) => (
          <BreadcrumbItem
            href={pathname.slice(0, index + 1).join("/")}
            key={index}
          >
            {path}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">Lista de autores</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Buscar autor"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <Skeleton isLoaded={true} className="rounded-md">
            <AddAuthor />
          </Skeleton>
          <Button color="secondary">Exportar a CSV</Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <AuthorTableWrapper />
      </div>
    </div>
  );
};
