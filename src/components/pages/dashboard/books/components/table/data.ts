import { BookModel } from "@/models";

interface IColumns {
  name: string;
  uid: keyof BookModel | "actions";
}

export const columns: IColumns[] = [
  { name: "TITULO", uid: "title" },
  { name: "AUTOR", uid: "author" },
  { name: "DEWAY", uid: "deway" },
  { name: "EDITORIAL", uid: "publisher" },
  { name: "EDICION", uid: "edition" },
  { name: "ESTADO", uid: "deletedAt" },
  { name: "ACCIONES", uid: "actions" },
];
