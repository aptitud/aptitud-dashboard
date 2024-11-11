import Image from "next/image";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();

    return (
        <div className="flex flex-col items-center justify-center p-4 md:p-8 space-y-6">
            {/* Image container with responsive sizing */}
            <div className="relative w-full max-w-96 aspect-[16/9]">
                <Image
                    src="/aptitud-logo.png" // Make sure to add your image to the public folder
                    alt="Aptitud"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center">Aptitud Dashboard</h1>

            {session?.user ? (
                <p className="text-lg text-center max-w-2xl text-muted-foreground">Välkommen {session.user.name}</p>
            ) : (
                <p className="text-lg text-center max-w-2xl text-muted-foreground">Du måste logga in med ett aptitudkonto för att komma åt informationen</p>
            )}
        </div>
    );
}
