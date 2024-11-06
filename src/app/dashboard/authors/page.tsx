import { AuthorsWrapper } from "@/components/pages/dashboard/authors";
import { NextPage } from "next";
import { AuthorsProvider } from "./providers";

const authors: NextPage = () => {
  return (
    <AuthorsProvider>
      <AuthorsWrapper />
    </AuthorsProvider>
  );
};

export default authors;
