"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => import("../../../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  },
);

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="mt-6 w-full p-3 text-center text-5xl font-bold uppercase">
      Bienvenidos a BIB
      <span className="text-blue-500">{"TEC"}</span>
    </div>
  </div>
);
