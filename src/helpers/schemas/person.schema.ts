import { object, string } from "yup";

export const updatePersonSchema = object().shape({
  telephone: string().min(9, "Minimo 8 caracteres").optional(),
  address: string().optional(),
});
