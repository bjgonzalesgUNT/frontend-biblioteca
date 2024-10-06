import { Divider } from "@nextui-org/divider"; 
import { Image } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex h-screen">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          className="object-cover w-full h-full filter blur-sm"
          src="https://hips.hearstapps.com/hmg-prod/images/old-books-in-a-library-big-file-royalty-free-image-1666591048.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div> {/* Capa oscura opcional */}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-2 z-10">
        <div className="p-2 rounded-lg shadow-lg ">
          {children}
        </div>
      </div>
    </div>
  );
};
