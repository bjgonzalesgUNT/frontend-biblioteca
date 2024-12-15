import { BookWrapper } from "@/components/pages/books/BookWrapper";
import { NextPage } from "next";
import { Suspense } from "react";

const BooksPage: NextPage = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <BookWrapper />
    </Suspense>
  );
};

export default BooksPage;
