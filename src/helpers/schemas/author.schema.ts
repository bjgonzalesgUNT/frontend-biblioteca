import { object, string } from "yup";

export const createAuthorSchema = object().shape({
  surnames: string().required("Es requerido al menos un apellido"),
  names: string().required("Es requerido al menos un nombre"),
  nationality: string().required("La nacionalidad es requerida"),
  gender: string().required("El género es requerido"),
  alias: string().required("El alias es requerido"),
  image_url: string()
    .url('La imagen debe ser una URL válida (ejemplo: "http://example.com")')
    .optional(),
});

export const updateAuthorSchema = object().shape({
  image_url: string()
    .url('La imagen debe ser una URL válida (ejemplo: "http://example.com")')
    .required("La imagen es requerida"),
});
