import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    token?: string;
  }
}