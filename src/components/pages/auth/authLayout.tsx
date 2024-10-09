import { Divider } from "@nextui-org/divider"; 
import { Image } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 z-0 bg-[url('https://hips.hearstapps.com/hmg-prod/images/old-books-in-a-library-big-file-royalty-free-image-1666591048.jpg')] bg-cover filter blur-sm"></div>
      <div className="relative flex flex-1 flex-col items-center justify-center p-2 z-10">
        <div className="p-4 rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};
