import Image from "next/image";
import logo from "@/app/aptitud-logo.png";
import { SignInButton } from "@/components/auth/signin-button";
import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {

    const session = await auth();

    if (!!session?.user) {
        redirect("/customers", RedirectType.replace);
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6">
            <div className="relative w-full max-w-96 aspect-[16/9]">
                <Image src={logo} alt="Aptitud" fill priority className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center">Aptitud Dashboard</h1>

            <p className="text-lg text-center max-w-2xl text-muted-foreground">Du måste logga in med ett aptitudkonto för att komma åt informationen</p>
            <Suspense>
                <SignInButton />
            </Suspense>
        </div>
    );
}
