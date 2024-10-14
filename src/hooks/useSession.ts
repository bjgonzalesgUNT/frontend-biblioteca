import { getSession } from "@/lib";
import { UserModel } from "@/models";
import { useCallback, useEffect, useState } from "react";

export const useSession = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const sessionHandler = useCallback(async () => {
    const session = await getSession();
    if (session) {
      setUser(session.user);
      setToken(session.token);
    }
  }, []);

  useEffect(() => {
    sessionHandler();
  }, [sessionHandler]);

  return { user, token };
};
