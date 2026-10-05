import "next-auth";

declare module "next-auth" {
  interface User {
    role: "ADMIN" | "USER";
  }

  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
