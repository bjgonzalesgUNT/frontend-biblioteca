"use client";
import Sidebar from "./components/sidebar";
import { Header } from "./components/Header";
import { BookCard } from "./components/BookCard";
import { lastBooks } from "./components/data";
import { Pagination } from "@nextui-org/react";

export const BookWrapper = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex flex-1 flex-col p-4 px-24">
        <Header />
        <div className="mx-auto my-10 grid grid-cols-3 gap-20">
          {lastBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
        <Pagination
          showControls
          total={3}
          initialPage={1}
          className="flex justify-end"
        />
      </main>
    </div>
  );
};
