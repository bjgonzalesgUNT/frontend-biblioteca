import { PaginationModel } from "@/models";
import { useCallback, useEffect, useState } from "react";

interface Props<T> {
  promise: (page: number, limit?: number) => Promise<PaginationModel<T>>;
  onSuccess?: (data: T[]) => void;
  onError?: (error: any) => void;
}

export const usePagination = <T>({ promise, onSuccess, onError }: Props<T>) => {
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
      if (onSuccess) {
        onSuccess(rows);
      }
    } catch (error: any) {
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
