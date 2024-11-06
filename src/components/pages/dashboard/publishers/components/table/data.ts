import { PublisherModel } from "@/models";

interface IColumns {
  name: string;
  uid: keyof PublisherModel | "actions";
}

export const columns: IColumns[] = [
  { name: "EDITORIAL", uid: "name" },
  { name: "ESTADO", uid: "deletedAt" },
  { name: "ACCIONES", uid: "actions" },
];
