"use client";

import { NextPage } from "next";
import Link from "next/link";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { BookModel } from "@/models";
import { useState, useEffect } from "react";
import { BooksService } from "@/services";
import { useParams } from "next/navigation";
import { Divider, Image } from "@nextui-org/react";
import { BookCard } from "@/components/pages/books/components";

const getWindowSize = () => {
  return window.innerWidth;
};

const viewBookPage: NextPage = () => {
  const [book, setBook] = useState<BookModel | null>(null);
  const [windowsSize, setWindowsSize] = useState(-1);
  const params = useParams();
  const bookId = params["id"];

  useEffect(() => {
    const handleResize = () => setWindowsSize(getWindowSize());
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Aqui pusimos de mientras para obtener el libro con su bookId
  const handleFetch = async () => {
    try {
      const response = await BooksService.getAllPaginate(1, 1000);
      const books = response.rows;
      const matchedBook = books.find((b: BookModel) => b.id === Number(bookId));
      setBook(matchedBook || null);
      console.log(matchedBook);
    } catch (error) {}
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#111322] px-8 py-10 md:px-16">
      <div className="h-20 max-w-full">
        <ul className="flex">
          <li className="flex gap-2">
            <HouseIcon />
            <Link href={"/"}>
              <span>Inicio</span>
            </Link>
            <span> / </span>{" "}
          </li>

          <li className="flex gap-2">
            <Link href={"/books"}>
              <span>Libros</span>
            </Link>
            <span> / </span>{" "}
          </li>
          <li className="flex gap-2">
            <Link href={`/books/${bookId}`}>
              <div className="max-w-[180px] overflow-hidden truncate text-ellipsis whitespace-nowrap sm:max-w-full">
                <span className="underline">{book?.title}</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex justify-center text-2xl font-bold sm:text-3xl md:text-5xl">
        Información del libro
      </div>

      {windowsSize > -1 && windowsSize <= 800 && (
        <div
          className="mx-auto mt-20 grid max-w-7xl gap-10 rounded-3xl bg-[#212542] px-6 py-10 md:px-20"
          style={{ gridTemplateColumns: "1fr" }}
        >
          <div className="flex h-auto flex-col items-center gap-6 md:h-[40rem]">
            <Image
              alt="Mountains"
              src={book?.image_url}
              className="h-[24rem] rounded-lg object-cover md:h-[36rem]"
            />
            <div className="flex justify-center gap-4 md:justify-start">
              <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-white">
                Descargar
              </button>
            </div>
          </div>

          <div className="flex h-auto flex-col justify-between rounded-3xl md:h-[40rem]">
            <div className="my-auto">
              <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
                {book?.title || "Sin título"}
              </h2>

              <ul className="mt-6 space-y-2 text-base md:text-lg">
                <li>
                  <strong>Autor:</strong> <br />
                  {book?.author
                    ? `${book.author.surnames} ${book.author.names}`
                    : "No disponible"}
                </li>
                <br />
                <li>
                  <strong>Editorial:</strong> <br />
                  {book?.publisher?.name || "No disponible"}
                </li>
                <br />
                <li>
                  <strong>Descripción:</strong> <br />
                  {book?.description || "No disponible"}
                </li>
                <br />
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  <li>
                    <strong>Páginas:</strong> <br />
                    {book?.pages || "No disponible"}
                  </li>
                  <li>
                    <strong>Edición:</strong> <br />
                    {book?.edition || "No disponible"}
                  </li>
                  <li>
                    <strong>Fecha de publicación:</strong> <br />
                    {book?.published_at || "No disponible"}
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
      {windowsSize > -1 && windowsSize > 800 && (
        <div
          className="mx-auto mt-20 grid max-w-7xl gap-10 rounded-3xl bg-[#212542] px-20 py-10"
          style={{ gridTemplateColumns: "6fr 1fr 6fr" }}
        >
          <div className="flex h-[40rem] flex-col gap-6">
            <Image
              alt="Mountains"
              src={book?.image_url}
              className="h-[36rem]"
            />
            <div className="flex justify-start gap-4">
              <button className="rounded-lg bg-primary px-4 py-2 text-white">
                Descargar
              </button>
            </div>
          </div>

          <div className="w-5">
            <Divider className="my-2 w-1" orientation="vertical" />
          </div>

          <div className="flex h-[40rem] flex-col justify-between rounded-3xl">
            <div className="my-auto">
              <h2 className="mb-4 text-center text-3xl font-bold">
                {book?.title || "Sin título"}
              </h2>

              <ul className="mt-10 space-y-2 text-lg">
                <li>
                  <strong>Autor:</strong> <br />{" "}
                  {book?.author
                    ? `${book.author.surnames} ${book.author.names}`
                    : "No disponible"}
                </li>
                <br />
                <li>
                  <strong>Editorial:</strong> <br />{" "}
                  {book?.publisher?.name || "No disponible"}
                </li>
                <br />
                <li>
                  <strong>Descripción:</strong> <br />{" "}
                  {book?.description || "No disponible"}
                </li>
                <br />
                <div className="grid grid-cols-3">
                  <li>
                    <strong>Páginas:</strong> <br />{" "}
                    {book?.pages || "No disponible"}
                  </li>
                  <li>
                    <strong>Edición:</strong> <br />{" "}
                    {book?.edition || "No disponible"}
                  </li>
                  <li>
                    <strong>Fecha de publicación:</strong> <br />{" "}
                    {book?.published_at || "No disponible"}
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default viewBookPage;
