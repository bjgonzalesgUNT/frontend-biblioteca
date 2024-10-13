import { UsersWrapper } from "@/components/pages/dashboard/users";
import { UsersProviders } from "./providers";

const accounts = () => {
  return (
    <UsersProviders>
      <UsersWrapper />
    </UsersProviders>
  );
};

export default accounts;
