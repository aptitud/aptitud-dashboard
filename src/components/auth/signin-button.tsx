"use client";

import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const SignInButton = () => {
    const searchParams = useSearchParams();

    return (
        <Button variant={"default"} size={"lg"} onClick={() => signIn("google", { redirectTo: searchParams.get("callbackUrl") || "/customers" })}>
            <User2Icon size={8} />
            <span>Logga in</span>
        </Button>
    );
};
