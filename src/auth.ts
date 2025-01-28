import { authConfig } from "@/configs/auth-config-refresh";
import NetxAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NetxAuth(authConfig);
