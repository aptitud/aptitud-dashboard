import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import "../globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Aptitud Dashboard",
    description: "The state of Aptitud",
};

type DashboardLayoutProps = {
    children: React.ReactNode
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
            <SessionProvider>
                <Header />
                <main className="flex-1 m-4 relative">{children}</main>
                <div className="more-menu"></div>
            </SessionProvider>
        </div>
    );
}
