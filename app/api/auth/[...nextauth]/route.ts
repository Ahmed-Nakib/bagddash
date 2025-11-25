import NextAuth, { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface MyUser extends User {
  role: string;
}

// NextAuth config
export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req): Promise<MyUser | null> {
        if (!credentials?.email || !credentials?.password) return null;

        // Demo users
        const users: MyUser[] = [
          { id: "1", email: "nakib@gmail.com", role: "admin" }
        ];

        const user = users.find(
          (u) =>
            u.email === credentials.email && credentials.password === "nakib"
        );

        return user || null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as MyUser).role;
      return token;
    },

    async session({ session, token }) {
      (session.user as MyUser).role = token.role as string;
      return session;
    },
  },

  pages: {
    signIn: "/login", // optional: custom login page
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
