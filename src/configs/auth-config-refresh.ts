import { JWT } from "@auth/core/jwt";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

class RefreshAccessTokenError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "RefreshAccessTokenError";
    this.cause = cause;
  }
}

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (!token?.refreshToken) {
      return token;
    }

    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    throw new RefreshAccessTokenError("Error refreshing access token", error);
  }
};

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
          scope: "openid email profile https://www.googleapis.com/auth/spreadsheets.readonly",
          access_type: "offline",
          prompt: "consent",
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
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }) {
      const initialLogin = !!account;
      if (initialLogin) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in! * 1000,
          refreshToken: account.refresh_token,
        };
      }

      const accessTokenExpired = token.accessTokenExpires < Date.now();
      if (accessTokenExpired) {
        return refreshAccessToken(token);
      }

      return token;
    },
  },
};
