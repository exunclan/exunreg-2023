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
      async authorize(credentials: any, _req: any) {
        // Logic executed when a user tries to singin

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

        console.log(user);

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
    redirect: async () =>{
      return process.env.NEXT_PUBLIC_URL+"/dashboard"
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
};
