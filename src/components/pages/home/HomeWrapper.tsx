"use client";
import { HeroSection } from "./components/HeroSection";
import { BookCard } from "./components/BookCard";
import { AuthorCard } from "./components/AuthorCard";
import { lastBooks, remarkableBooks, authors } from "./components/data";
import { Button, Link } from "@nextui-org/react";

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex justify-center py-8 pt-16">
    <h1 className="text-2xl font-bold">{title}</h1>
  </div>
);

const SeeMoreButton = ({ href }: { href: string }) => (
  <div className="mt-16 flex w-full items-center justify-center pb-16">
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

export const HomeWrapper = () => {
  return (
    <div>
      <HeroSection />
      <main>
        <section>
          <SectionHeader title="ÚLTIMAS PUBLICACIONES" />
          <div className="mx-40 my-10 flex justify-around gap-6">
            {lastBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
          <SeeMoreButton href="/books" />
        </section>

        <section className="bg-primary-50">
          <SectionHeader title="MÁS DESTACADOS" />
          <div className="mx-40 my-10 flex justify-around gap-6">
            {remarkableBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
          <SeeMoreButton href="/books" />
        </section>

        <section>
          <SectionHeader title="AUTORES DESTACADOS" />
          <div className="mx-40 my-10 flex justify-around gap-6">
            {authors.map((author, index) => (
              <AuthorCard key={index} author={author} />
            ))}
          </div>
          <SeeMoreButton href="/authors" />
        </section>

        <div className="relative h-[40vh]">
          <div className="absolute inset-0 bg-black/70"></div>
          <img
            src="https://www.teknei.com/wp-content/uploads/2020/09/alfons-morales-YLSwjSy7stw-unsplash-e1630306388778.jpg"
            className="h-full w-full object-cover"
            alt="Biblioteca de libros"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Descubre el mundo de los libros
            </h1>
            <p className="max-w-2xl text-lg text-gray-300 md:text-xl">
              "Sumérgete en historias cautivadoras, expande tus conocimientos y
              encuentra la inspiración. Explora nuestra colección digital."
            </p>
          </div>
        </div>
      </main>

      <div className="flex h-[60vh] items-end">
        <span>Footer</span>
      </div>
    </div>
  );
};
