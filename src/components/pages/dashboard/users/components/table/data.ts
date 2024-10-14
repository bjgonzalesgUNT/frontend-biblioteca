import { UserModel } from "@/models";

interface IColumns {
  name: string;
  uid: keyof UserModel;
}

export const columns: IColumns[] = [
  { name: "ID", uid: "id" },
  { name: "USUARIO", uid: "username" },
  { name: "ROL", uid: "role" },
  { name: "APELLIDOS", uid: "surnames" },
  { name: "NOMBRE", uid: "names" },
  { name: "ESTADO", uid: "status" },
];
