import { authConfig } from "@/configs/auth-config";
import NetxAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NetxAuth(authConfig);
