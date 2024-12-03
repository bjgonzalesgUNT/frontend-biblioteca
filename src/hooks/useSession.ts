import { getSession } from "@/lib";
import { IPayload } from "@/lib/interfaces";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<IPayload | null>(null);

  const getUserSession = async () => {
    const session = await getSession();
    if (session) {
      setSession(session);
    }
  };

  useEffect(() => {
    getUserSession();
  }, []);

  return { session, setSession };
};
