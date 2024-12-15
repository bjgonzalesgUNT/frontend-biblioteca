"use client";

import {
  getBooksPaginated,
  useBooksDispatch,
  useBooksSelector,
} from "@/context/books";
import { BooksService } from "@/services";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddBook, SearchBook } from "./components";
import { BooksTableWrapper } from "./components/table";

export const BooksWrapper = () => {
  const pathname = usePathname();

  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useBooksDispatch();

  const {
    isLoading,
    currentPage,
    rows: books,
    total,
    totalPages,
    count,
    error,
  } = useBooksSelector((state) => state.booksPaginated);

  if (error) toast.error(error);

  const handleChangeValue = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(
      getBooksPaginated({
        page,
        url: searchValue
          ? `${BooksService.getByFilterPaginateUrl}/${searchValue}`
          : BooksService.getAllPaginateUrl,
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

      <h3 className="text-xl font-semibold">Lista de libros</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <SearchBook handleChangeValue={handleChangeValue} />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <AddBook />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <BooksTableWrapper
          books={books}
          isLoading={isLoading}
          page={currentPage}
          setPage={setPage}
          total={total}
          totalPages={totalPages}
          count={count}
        />
      </div>
    </div>
  );
};
