// FORMS

export interface LoginFormType {
  username: string;
  password: string;
}

export interface SignUpFormType {
  username: string;
  password: string;
  person_id: number;
  role_id: string;
}
export interface ChangePasswordFormType {
  current_password: string;
  confirm_password: string;
  new_password: string;
}
