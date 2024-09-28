import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: id;
      username: string;
      role: string;
      pages: string[];
      token: string;
    };
  }

  interface User {
    id: id;
    username: string;
    role: string;
    pages: string[];
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: id;
      username: string;
      role: string;
      pages: string[];
      token: string;
    };
  }
}
