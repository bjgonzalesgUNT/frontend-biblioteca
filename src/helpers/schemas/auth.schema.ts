import { object, string } from "yup";

export const LoginSchema = object().shape({
  username: string().required("Usuario es requerido"),
  password: string().required("Contraseña es requerida"),
});
