import { BookModel } from "@/models";
import { Skeleton } from "@nextui-org/react";
import { BookCard } from "./BookCard";

interface Props {
  books: BookModel[];
  isLoading: boolean;
}

export const BookCardsWrapper = ({ books, isLoading }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book, index) => (
        <Skeleton
          key={index}
          isLoaded={!isLoading}
          className="rounded-lg"
          classNames={{
            content: "block size-full",
          }}
        >
          <BookCard key={book.id} book={book} />
        </Skeleton>
      ))}
    </div>
  );
};
