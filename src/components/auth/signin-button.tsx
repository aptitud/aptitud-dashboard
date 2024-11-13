"use client";

import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
    return (
        <Button variant={"default"} size={"lg"} onClick={() => signIn("google")}>
            <User2Icon size={8} />
            <span>Logga in</span>
        </Button>
    );
};
