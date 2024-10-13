export interface UserAuthModel {
  token: string;
  user: {
    id: number;
    username: string;
    names: string;
    surnames: string;
    document: string;
    role: "admin" | "user";
    pages: string[];
    status: boolean;
  };
}
