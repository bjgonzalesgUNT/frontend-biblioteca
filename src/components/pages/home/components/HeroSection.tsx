import { SearchIcon } from "@/components/icons";
import { Image, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative h-screen w-full">
      <Image
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        classNames={{
          img: "h-full w-full object-cover rounded-none z-0",
        }}
        alt="Biblioteca de libros"
        removeWrapper
      />

      <div className="absolute inset-0 z-10 flex size-full flex-col items-center justify-center space-y-6 bg-black/50 px-10 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          Descubre el mundo de los libros
        </h1>
        <p className="max-w-2xl text-lg text-gray-300 md:text-xl">
          Sumérgete en historias cautivadoras, expande tus conocimientos y
          encuentra la inspiración. Explora nuestra colección digital.
        </p>

        <div className="mt-8 flex w-full max-w-xl items-center">
          <Input
            isClearable
            radius="full"
            size="lg"
            className="text-black dark:text-black"
            classNames={{
              label: "text-black dark:text-black",
              input: [
                "bg-transparent",
                "!text-black !dark:text-black",
                "placeholder:text-black/50 dark:placeholder:text-black/50",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-white/50",
                "dark:bg-white/60",
                "backdrop-blur-xl",
                "hover:bg-white/70",
                "dark:hover:bg-white/70",
                "group-data-[focus=true]:bg-white/50",
                "dark:group-data-[focus=true]:bg-bg-white/60",
                "!cursor-text",
              ],
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Busca libros por título o autor"
            endContent={
              <Link
                href={{
                  pathname: "/books",
                  query: { filter: searchTerm },
                }}
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
