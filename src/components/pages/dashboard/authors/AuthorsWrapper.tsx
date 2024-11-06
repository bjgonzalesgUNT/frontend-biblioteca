"use client";

import {
  getAuthorsPaginatedThunk,
  useAuthorsDispatch,
  useAuthorsSelector,
} from "@/context/authors";
import { AuthorsService } from "@/services";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddAuthor, AuthorsTableWrapper, SearchAuthor } from "./components";

export const AuthorsWrapper = () => {
  const pathname = usePathname();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const dispatch = useAuthorsDispatch();

  const {
    isLoading,
    rows: authors,
    total,
    totalPages,
    count,
    error,
  } = useAuthorsSelector((state) => state.authorsPaginated);

  if (error) toast.error(error);

  // * Reestablece la página a 1 cuando se realiza una búsqueda
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(
      getAuthorsPaginatedThunk({
        page,
        url: searchValue
          ? `${AuthorsService.getByFilterPaginatedUrl}/${searchValue}`
          : AuthorsService.getAllPaginatedUrl,
      }),
    );
  }, [dispatch, page, searchValue]);

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
          <SearchAuthor handleSearchChange={handleSearchChange} />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <AddAuthor />
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
          count={count}
        />
      </div>
    </div>
  );
};
