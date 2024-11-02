"use client";

import {
  getAuthorsPaginatedThunk,
  useAuthorsDispatch,
  useAuthorsSelector,
} from "@/context/authors";
import { AuthorsService } from "@/services";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Skeleton,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AddAuthor, AuthorsTableWrapper } from "./components";
import { toast } from "sonner";

export const AuthorsWrapper = () => {
  const pathname = usePathname();

  const [page, setPage] = useState<number>(1);
  const dispatch = useAuthorsDispatch();

  const {
    isLoading,
    rows: authors,
    total,
    totalPages,
    error,
  } = useAuthorsSelector((state) => state.authorsPaginated);

  if (error) toast.error(error);

  useEffect(() => {
    dispatch(
      getAuthorsPaginatedThunk({
        page,
        url: AuthorsService.getAllPaginatedUrl,
      }),
    );
  }, [dispatch, page]);

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
        <AuthorsTableWrapper
          isLoading={isLoading}
          authors={authors}
          page={page}
          setPage={setPage}
          total={total}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
