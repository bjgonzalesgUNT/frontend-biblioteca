"use client";

import { setAuthors } from "@/context/authors";
import {
  setSummaries1,
  setSummaries2,
  setSummaries3,
} from "@/context/books/slices";
import {
  AuthorsService,
  PublishersService,
  SummariesService,
} from "@/services";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Skeleton,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { AddBook } from "./components";
import { BooksTableWrapper } from "./components/table";
import { setPublishers } from "@/context/publishers";

export const BooksWrapper = () => {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [s1, s2, s3, authors, publishers] = await Promise.all([
        SummariesService.getS1(),
        SummariesService.getS2(),
        SummariesService.getS3(),
        AuthorsService.getAll(),
        PublishersService.getAll(),
      ]);

      dispatch(setSummaries1(s1));
      dispatch(setSummaries2(s2));
      dispatch(setSummaries3(s3));
      dispatch(setAuthors(authors));
      dispatch(setPublishers(publishers));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

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
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Buscar libro"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <Skeleton isLoaded={!isLoading} className="rounded-md">
            <AddBook />
          </Skeleton>
          <Button color="secondary">Exportar a CSV</Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <BooksTableWrapper />
      </div>
    </div>
  );
};
