import { PublishersWrapper } from "@/components/pages/dashboard/publishers";
import { NextPage } from "next";
import { PublishersProviders } from "./providers";

const publishers: NextPage = () => {
  return (
    <PublishersProviders>
      <PublishersWrapper />
    </PublishersProviders>
  );
};

export default publishers;
