import { PaginationModel } from "@/models";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props<T> {
  promise: (page: number, limit?: number) => Promise<PaginationModel<T>>;
}

export const usePagination = <T>({ promise }: Props<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);

  const handleGetData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { rows, total, totalPages, currentPage } = await promise(page);
      setPage(currentPage);
      setTotal(total);
      setTotalPages(totalPages);
      setData(rows);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [promise, page]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return {
    isLoading,
    total,
    totalPages,
    page,
    setPage,
    data,
  };
};
