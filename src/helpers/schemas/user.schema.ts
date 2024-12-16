import { object, string } from "yup";

export const createUserSchema = object().shape({
  surnames: string()
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, "Los apellidos solo pueden contener letras")
    .required("Los apellidos son requeridos"),
  names: string()
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, "Los nombres solo pueden contener letras")
    .required("Los nombres son requeridos"),
  document: string()
    .length(8, "El documento debe tener minimo 8 caracteres")
    .required("El documento es requerido"),
  gender: string().required("El género es requerido"),
  nacionality: string().required("La nacionalidad es requerida"),
  telephone: string().optional(),
  address: string().optional(),
  role_id: string().required("El rol es requerido"),
});
