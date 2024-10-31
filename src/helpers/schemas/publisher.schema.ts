import { object, string } from "yup";

export const createPublisherSchema = object().shape({
  name: string().required("El nombre de la editorial es requerido"),
});
