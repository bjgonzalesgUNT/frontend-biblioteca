import { AuthorModel } from "@/models";

interface IColumns {
  name: string;
  uid: keyof AuthorModel | "actions";
}

export const columns: IColumns[] = [
  { name: "APELLIDOS", uid: "surnames" },
  { name: "NOMBRES", uid: "names" },
  { name: "NACIONALIDAD", uid: "nationality" },
  { name: "ALIAS", uid: "alias" },
  { name: "ESTADO", uid: "deletedAt" },
  { name: "ACCIONES", uid: "actions" },
];
