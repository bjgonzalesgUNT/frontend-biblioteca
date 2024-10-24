import { BooksWrapper } from "@/components/pages/dashboard/books";
import { NextPage } from "next";
import { BooksProviders } from "./providers";

const books: NextPage = () => {
  return (
    <BooksProviders>
      <BooksWrapper />
    </BooksProviders>
  );
};

export default books;
