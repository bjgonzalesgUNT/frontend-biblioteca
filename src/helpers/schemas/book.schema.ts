import { object, string } from "yup";

export const createBookSchema = object().shape({
  title: string().required("El título es requerido"),

  summary_1_id: string().required("El sumario 1 es requerido"),
  summary_2_id: string().when("summary_1_id", (value, schema) => {
    if (value) {
      return schema.required("El sumario 2 es requerido");
    }
    return schema;
  }),
  deway_id: string().when("summary_2_id", (value, schema) => {
    if (value) {
      return schema.required("El summario 3 es requerido");
    }
    return schema;
  }),

  author_id: string().required("El autor es requerido"),
  publisher_id: string().required("El editorial es requerido"),
  description: string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .required("La descripción es requerida"),
  pages: string()
    .matches(/^\d+$/, "El número de páginas debe ser un número")
    .required("El número de páginas es requerido"),
  edition: string()
    .matches(/^\d+$/, "La edición debe ser un número")
    .required("La edición es requerida"),
  image_url: string()
    .url('La imagen debe ser una URL válida (ejemplo: "http://example.com")')
    .optional(),
  path: string()
    .url('La ruta debe ser una URL válida (ejemplo: "http://example.com")')
    .optional(),
  published_at: string().required("La fecha de publicación es requerida"),
});
