"use client";
import { BluePurple1 } from "@/components/icons/blue-purple-1";
import { BluePurple2 } from "@/components/icons/blue-purple-2";
import { AuthorModel, BookModel } from "@/models";
import { AuthorsService, BooksService } from "@/services";
import { Button, Divider, Link, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AuthorCard } from "./components/AuthorCard";
import { BookCard } from "./components/BookCard";
import { HeroSection } from "./components/HeroSection";

const getWindowSize = () => {
  return window.innerWidth;
};

const SeeMoreButton = ({ href }: { href: string }) => (
  <div className="my-10 flex items-center justify-center">
    <Link href={href}>
      <Button
        disableRipple
        className="relative overflow-visible rounded-full bg-[#006FEE] px-12 text-xl text-white shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
        size="lg"
      >
        Ver más
      </Button>
    </Link>
  </div>
);

const SectionHeader = ({
  title,
  text,
  highlight,
}: {
  title: string;
  text: string;
  highlight: string;
}) => (
  <>
    <div className="flex justify-center py-8 pt-16">
      <h1 className="text-center text-4xl font-bold md:text-6xl lg:text-left">
        {title}
      </h1>
    </div>
    <div className="mx-auto text-center lg:text-left">
      <p className="max-w-3xl text-xl">
        {text}
        <span className="font-bold text-amber-300"> {highlight}</span>
      </p>
    </div>
  </>
);

const BooksGrid = ({ books, size }: { books: BookModel[]; size: number }) => {
  if (size >= 1536) {
    return (
      <div className="col-span-1 grid grid-cols-4 gap-6">
        {books.slice(0, 5).map((book, index) => (
          <div
            key={index}
            className={`flex ${index === 0 ? "col-span-2 row-span-2 justify-end" : "col-span-1 row-span-1 justify-center"}`}
          >
            <BookCard
              book={book}
              customWidth={index == 0 ? 350 : 200}
              customHeight={index == 0 ? 550 : 200}
            />
          </div>
        ))}
      </div>
    );
  }
  if (size >= 1280) {
    return (
      <div className="col-span-1 grid grid-cols-3 gap-6">
        {books.slice(0, 3).map((book, index) => (
          <div
            key={index}
            className={`flex ${index === 0 ? "col-span-2 row-span-2 justify-end" : "col-span-1 row-span-1 justify-start"}`}
          >
            <BookCard
              book={book}
              customWidth={index == 0 ? 350 : 200}
              customHeight={index == 0 ? 550 : 175}
            />
          </div>
        ))}
      </div>
    );
  }
  if (size >= 1024) {
    return (
      <div className="col-span-1 grid grid-cols-2 gap-6">
        {books.slice(0, 4).map((book, index) => (
          <div
            key={index}
            className="col-span-1 row-span-1 flex justify-center"
          >
            <BookCard book={book} customWidth={200} customHeight={200} />
          </div>
        ))}
      </div>
    );
  }
  if (size >= 540) {
    return (
      <div className="col-span-2 grid grid-cols-2 gap-6">
        {books.slice(0, 4).map((book, index) => (
          <div
            key={index}
            className="col-span-1 row-span-1 flex justify-center"
          >
            <BookCard book={book} customWidth={200} customHeight={200} />
          </div>
        ))}
      </div>
    );
  }
  if (size === -1) {
    return (
      <div className="flex justify-center gap-4">
        <Spinner label="Cargando" color="default" labelColor="foreground" />
      </div>
    );
  }

  return (
    <div className="col-span-2 space-y-10">
      {books.slice(0, 4).map((book, index) => (
        <div key={index} className="flex justify-center">
          <BookCard book={book} customWidth={200} customHeight={200} />
        </div>
      ))}
    </div>
  );
};

export const HomeWrapper = () => {
  const [windowsSize, setWindowsSize] = useState(-1);
  const [books, setBooks] = useState<BookModel[]>([]);
  const [authors, setAuthors] = useState<AuthorModel[]>([]);

  useEffect(() => {
    const handleResize = () => setWindowsSize(getWindowSize());
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFetch = async () => {
    try {
      const [books, authors] = await Promise.all([
        BooksService.getByFilterPublicPaginated({ page: 1, limit: 5 }),
        AuthorsService.getAllPaginated(1, 4),
      ]);
      setBooks(books.rows);
      setAuthors(authors.rows);
    } catch (error) {}
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="overflow-hidden bg-[#111322]">
      <HeroSection />
      <main>
        <section className="relative px-16">
          <div className="relative z-10 mx-auto my-20 grid max-w-screen-xl grid-cols-[1fr_2fr] gap-10 2xl:max-w-screen-2xl 2xl:gap-32">
            <div className="absolute">
              <BluePurple1 />
            </div>
            <div className="col-span-2 my-auto lg:col-span-1">
              <SectionHeader
                title="ÚLTIMAS PUBLICACIONES"
                text="Descubre lo más reciente en tendencias, noticias y contenidos exclusivos. Mantente informado e inspirado con nuestras actualizaciones."
                highlight="¡No te lo pierdas!"
              />
              <div className="hidden lg:block">
                <SeeMoreButton href="/books" />
              </div>
            </div>
            <BooksGrid books={books} size={windowsSize} />
            <div className="col-span-2 block lg:hidden">
              <SeeMoreButton href="/books" />
            </div>
          </div>
        </section>

        <Divider className="my-16" />

        <section className="relative px-16">
          <div className="relative z-10 mx-auto my-20 grid max-w-screen-xl grid-cols-[2fr_1fr] gap-10 xl:gap-24 2xl:max-w-screen-2xl 2xl:gap-32">
            <div className="absolute">
              <BluePurple2 />
            </div>
            <div className="col-span-2 my-auto block lg:col-span-1 lg:hidden">
              <SectionHeader
                title="MÁS DESTACADOS"
                text="Explora lo mejor de nuestros contenidos: noticias, tendencias y temas clave que no puedes dejar pasar."
                highlight="¡Descubre lo más destacado ahora!"
              />
            </div>
            <BooksGrid books={books} size={windowsSize} />
            <div className="col-span-2 my-auto hidden lg:col-span-1 lg:block">
              <SectionHeader
                title="MÁS DESTACADOS"
                text="Explora lo mejor de nuestros contenidos: noticias, tendencias y temas clave que no puedes dejar pasar."
                highlight="¡Descubre lo más destacado ahora!"
              />
              <div className="col-span-1 hidden lg:block">
                <SeeMoreButton href="/books" />
              </div>
            </div>
            <div className="col-span-2 block lg:hidden">
              <SeeMoreButton href="/books" />
            </div>
          </div>
        </section>

        <Divider className="my-16" />

        <section className="relative">
          <div className="relative z-10 px-10">
            <div className="flex justify-center py-8 pt-16">
              <h1 className="text-center text-4xl font-bold md:text-6xl">
                AUTORES DESTACADOS
              </h1>
            </div>
            <div className="mx-auto flex justify-center text-center">
              <p className="max-w-3xl text-xl">
                Conoce a las mentes brillantes detrás de nuestros mejores
                contenidos. Descubre sus ideas, inspiraciones y obras más
                influyentes.
                <span className="font-bold text-amber-300">
                  ¡Explóralos ahora!
                </span>
              </p>
            </div>
            <div className="mx-auto my-10 grid grid-cols-4 gap-6">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="col-span-4 flex justify-center md:col-span-2 xl:col-span-1"
                >
                  <AuthorCard author={author} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
