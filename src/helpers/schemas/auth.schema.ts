import { object, ref, string } from "yup";

export const loginSchema = object().shape({
  username: string().required("Usuario es requerido"),
  password: string().required("Contraseña es requerida"),
});

export const changePasswordSchema = object().shape({
  current_password: string().required("Contraseña actual es requerida"),
  new_password: string()
    .required("Nueva contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirm_password: string()
    .required("Confirmar contraseña es requerida")
    .equals([ref("new_password")], "Las contraseñas no coinciden"),
});
