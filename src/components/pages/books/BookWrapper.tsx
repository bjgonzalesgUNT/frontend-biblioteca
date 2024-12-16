"use client";

import { BookModel } from "@/models";
import { BooksService } from "@/services";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BookCardsWrapper,
  HeaderWrapper,
  PaginationWrapper,
  SearchBookWrapper,
  SidebarWrapper,
} from "./components";
import { TSort } from "./types";

const limit = 24;

export const BookWrapper = () => {
  const searchParams = useSearchParams();

  const filterText = searchParams.get("filter") || "";

  const [filter, setFilter] = useState<string>(filterText);

  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<BookModel[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedSummaries2, setSelectedSummaries2] = useState<string[]>([]);

  const [selectedSortOption, setSelectedSortOption] = useState<TSort>("ASC");

  const booksFiltered = useMemo(() => {
    const sortedBooks =
      selectedSortOption === "ASC"
        ? books.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            } else if (a.title < b.title) {
              return -1;
            } else {
              return 0;
            }
          })
        : books.sort((a, b) => {
            if (a.title > b.title) {
              return -1;
            } else if (a.title < b.title) {
              return 1;
            } else {
              return 0;
            }
          });

    const booksFiltered = sortedBooks.filter((book) => {
      if (selectedSummaries2.length === 0) return true;
      return selectedSummaries2.includes(book.deway_id.toString());
    });

    return booksFiltered;
  }, [books, selectedSortOption, selectedSummaries2]);

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const { rows, total, totalPages, count } =
        await BooksService.getByFilterPublicPaginated({
          filter,
          page,
          limit,
        });
      setTotal(total);
      setTotalPages(totalPages);
      setCount(count);
      setBooks(rows);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [page, filter]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <main className="grid gap-x-4 gap-y-4 px-4 pt-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10 lg:px-16">
      <SearchBookWrapper setFilter={setFilter} filter={filterText} />
      <SidebarWrapper
        selectedSummaries2={selectedSummaries2}
        setSelectedSummaries2={setSelectedSummaries2}
      />
      <div className="grid gap-2 md:col-span-2 md:gap-3 lg:col-span-3 lg:gap-4">
        <HeaderWrapper
          count={count}
          page={page}
          total={total}
          setSelectedSortOption={setSelectedSortOption}
        />
        <BookCardsWrapper books={booksFiltered} isLoading={isLoading} />
        <PaginationWrapper
          page={page}
          setPage={setPage}
          total={total}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
};
