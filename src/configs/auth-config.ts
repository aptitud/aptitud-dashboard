import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/spreadsheets",
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async authorized({ auth }) {
      const isAptitudUser = auth?.user?.email?.endsWith("@aptitud.se");
      if (!isAptitudUser) {
        return false;
      }

      return !!auth;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, account }) {
      // Persist the access token in the token object
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
