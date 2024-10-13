import { getSession } from "@/lib";
import { UserModel } from "@/models";
import { useCallback, useEffect, useState } from "react";

export const useSession = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const sessionHandler = useCallback(async () => {
    const { user, token } = await getSession();
    setUser(user);
    setToken(token);
  }, []);

  useEffect(() => {
    sessionHandler();
  }, [sessionHandler]);

  return { user, token };
};
