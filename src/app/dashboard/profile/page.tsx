import { ProfileWrapper } from "@/components/pages/dashboard/profile";
import { NextPage } from "next";
import { ProfileProviders } from "./providers";

const Profile: NextPage = () => {
  return (
    <ProfileProviders>
      <ProfileWrapper />
    </ProfileProviders>
  );
};

export default Profile;
