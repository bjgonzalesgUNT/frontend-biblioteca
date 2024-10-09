import { Image } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="relative h-screen max-h-screen max-w-full">
      <Image
        alt="background"
        src="https://hips.hearstapps.com/hmg-prod/images/old-books-in-a-library-big-file-royalty-free-image-1666591048.jpg"
        className="absolute z-0 h-full w-full object-cover"
        removeWrapper
      />
      <div className="z-10 flex h-full flex-1 flex-col items-center justify-center p-2">
        <div className="w-full max-w-xs">{children}</div>
      </div>
    </div>
  );
};
