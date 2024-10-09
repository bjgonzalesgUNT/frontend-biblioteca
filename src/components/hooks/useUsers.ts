import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../services/users";
import { IUserModel } from "@/models";

interface Props{
  search: string
}

export function useUsers(){
  const [visibleUsers, setVisibleUsers] = useState<IUserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(
    async ({ search } : Props) => {
      try{
        setLoading(true); setError(null);
        
        const usersData = await fetchUsers({ search });
        setVisibleUsers(usersData);
        
      } catch(e : unknown){
        if(e instanceof Error) setError(e.message);
        else setError("Ocurrió un error inesperado");
        
      } finally {
        setLoading(false);
      }
    }, []
  );

  useEffect(() => { getUsers({ search: "" }); }, []);

  return {users : visibleUsers, getUsers, loading, error};
}