import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authConfig: NextAuthConfig  = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");

        if (
          email === "user@example.com" &&
          password === "user123"
        ) {
          return {
            id: "user-123",
            name: "Jaspreet",
            email,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub as string;

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut }: any = NextAuth(authConfig);