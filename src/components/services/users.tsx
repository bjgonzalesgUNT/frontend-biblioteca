import { users } from "../table/data"

interface Props{
  search: string
}

export const fetchUsers = async ({ search } : Props) => {
  try{
    if(search === '') return users;
    const filteredUsers = users.filter((user) => user.name.toLowerCase().startsWith(search.toLowerCase()))
    return filteredUsers;
  }catch(e) {
    throw new Error('Error al obtener usuarios')
  }
}