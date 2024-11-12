import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Aptitud Dashboard",
    description: "The state of Aptitud",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
                <SessionProvider>
                    <ThemeProvider>
                        <Header />
                        <main className="flex-1 m-4 relative">{children}</main>
                        <div className="more-menu">
                            <ThemeSwitcher />
                        </div>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
