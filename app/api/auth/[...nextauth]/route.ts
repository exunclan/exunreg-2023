import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { encode, decode } from "next-auth/jwt";
import type { SessionStrategy } from "next-auth";

export const authOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  jwt: { encode, decode },
  pages: {
    signIn: "/user/signin",
    signOut: "/user/logout",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        // Logic executed when a user tries to singin

        console.log(`creds: `, JSON.stringify(credentials));
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email!,
              password: credentials?.password!,
            }),
          }
        ).then((res) => res.json());

        const { password, _id, team, ...filteredUser } = user;

        if (!user.error) {
          const auth = {
            id: user["_id"],
            ...filteredUser,
          };
          return auth;
        } else {
          throw new Error(user.error);
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ user, token }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
