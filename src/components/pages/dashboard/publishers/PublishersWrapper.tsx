"use client";

import {
  getPublishersPaginatedThunk,
  usePublishersDispatch,
  usePublishersSelector,
} from "@/context/publishers";
import { PublishersService } from "@/services";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AddPublisher,
  PublishersTableWrapper,
  SearchPublisher,
} from "./components";

export const PublishersWrapper = () => {
  const pathname = usePathname();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const dispatch = usePublishersDispatch();

  const {
    isLoading,
    rows: publishers,
    total,
    totalPages,
    count,
    error,
  } = usePublishersSelector((state) => state.publishersPaginated);

  if (error) toast.error(error);

  // * Reestablece la página a 1 cuando se realiza una búsqueda
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  useEffect(() => {
    dispatch(
      getPublishersPaginatedThunk({
        page,
        url: searchValue
          ? `${PublishersService.getByNamePaginateUrl}/${searchValue}`
          : PublishersService.getAllPaginateUrl,
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
      <h3 className="text-xl font-semibold">Lista de editoriales</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <SearchPublisher handleSearchChange={handleSearchChange} />
        </div>

        <div className="flex flex-row flex-wrap gap-3.5">
          <AddPublisher />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <PublishersTableWrapper
          isLoading={isLoading}
          page={page}
          publishers={publishers}
          setPage={setPage}
          total={total}
          totalPages={totalPages}
          count={count}
        />
      </div>
    </div>
  );
};
