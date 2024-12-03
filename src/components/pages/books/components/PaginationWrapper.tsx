import { Pagination } from "@nextui-org/react";

interface Props {
  page: number;
  setPage: (page: number) => void;
  total: number;
  totalPages: number;
}

export const PaginationWrapper = (props: Props) => {
  const { page, setPage, totalPages } = props;

  return (
    <div className="flex w-full items-center justify-end">
      {totalPages > 1 ? (
        <Pagination
          loop
          size="lg"
          showControls
          isCompact
          total={totalPages}
          page={page}
          onChange={setPage}
          initialPage={1}
        />
      ) : null}
    </div>
  );
};
