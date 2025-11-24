// lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ---- DEMO USERS ----
        const users = [
          {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
          },
          {
            id: "2",
            name: "Normal User",
            email: "user@example.com",
            password: "user123",
            role: "user",
          },
        ];

        const user = users.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );

        if (!user) return null;

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      (session.user as any).role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
