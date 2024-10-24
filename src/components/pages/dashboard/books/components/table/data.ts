import { BookModel } from "@/models";

interface IColumns {
  name: string;
  uid: keyof BookModel | "actions";
}

export const columns: IColumns[] = [
  { name: "TITULO", uid: "title" },
  { name: "AUTOR", uid: "author" },
  { name: "DEWAY", uid: "deway" },
  { name: "NOMBRE", uid: "publisher" },
  { name: "ESTADO", uid: "deletedAt" },
  { name: "ACCIONES", uid: "actions" },
];
