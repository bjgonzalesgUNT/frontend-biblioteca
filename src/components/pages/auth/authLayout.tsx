import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0 md:hidden">
          <Image
            className="h-full w-full"
            src="https://nextui.org/gradients/docs-right.png"
            alt="gradient"
          />
        </div>
        {children}
      </div>

      <div className="my-10 hidden md:block">
        <Divider orientation="vertical" />
      </div>

      <div className="relative flex flex-1 items-center justify-center p-6 md:flex">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0">
          <Image
            className="h-full w-full"
            src="https://nextui.org/gradients/docs-right.png"
            alt="gradient"
          />
        </div>

        <div className="z-10">
          <h1 className="text-[45px] font-bold">NextUI Dashboard Template</h1>
          <div className="mt-4 font-light text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            possimus voluptate, sapiente assumenda deserunt repellendus,
            perferendis odit voluptas hic dolores laborum fugit ut? Architecto
            quo ex quidem vitae quae rem.
          </div>
        </div>
      </div>
    </div>
  );
};
