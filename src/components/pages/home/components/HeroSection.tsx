import { useState } from "react";
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";

export const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 bg-black/70"></div>
      <img
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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

        <div className="mt-8 flex w-full max-w-xl items-center">
          <Input
            isClearable
            classNames={{
              label: "text-black",
              input: [
                "bg-transparent",
                "placeholder:text-black/70",
                "!text-black",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-white",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-white",
                "focus-within:bg-white",
                "dark:hover:bg-white",
                "dark:focus-within:bg-white",
                "!cursor-text",
              ],
              clearButton: ["text-gray-600 hover:text-gray-800"],
            }}
            radius="full"
            size="lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busca libros por título o autor"
            endContent={
              <Link
                href={`/books?name=${encodeURIComponent(searchTerm.trim())}`}
                passHref
              >
                <SearchIcon />
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
};
