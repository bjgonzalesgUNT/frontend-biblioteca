import { object, string } from "yup";

export const createUserSchema = object().shape({
  surnames: string().required("Los apellidos son requeridos"),
  names: string().required("Los nombres son requeridos"),
  document: string()
    .min(8, "El documento debe tener minimo 8 caracteres")
    .max(12, "El documento debe tener maximo 12 caracteres")
    .required("El documento es requerido"),
  gender: string().required("El género es requerido"),
  nacionality: string().required("La nacionalidad es requerida"),
  telephone: string().optional(),
  address: string().optional(),
  role_id: string().required("El rol es requerido"),
});
