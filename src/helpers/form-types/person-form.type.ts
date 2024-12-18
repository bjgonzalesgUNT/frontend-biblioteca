export interface PersonFormType {
  surnames: string;
  names: string;
  document: string;
  gender: string;
  nacionality: string;
  telephone: string;
  address: string;
}

export interface UpdatePersonFormType {
  telephone: string;
  address: string;
}
