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
        }),
    ],
};
