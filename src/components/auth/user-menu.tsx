"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";

export function UserMenu() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Button variant="ghost" size="icon" disabled>
                <User2 className="h-5 w-5" />
            </Button>
        );
    }

    if (!session) {
        return (
            <Button variant="ghost" size="icon" onClick={() => signIn("google")} title="Sign in">
                <User2 className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" title={session.user?.name ?? "User menu"}>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user?.image ?? undefined} alt={session.user?.name ?? "User avatar"} />
                        <AvatarFallback>
                            {session.user?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase() ?? "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
