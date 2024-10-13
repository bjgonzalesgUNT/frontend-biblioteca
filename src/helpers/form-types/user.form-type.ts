import { PersonFormType } from "./person-form.type";

export interface UserFormType extends PersonFormType {
  role_id: number;
}
