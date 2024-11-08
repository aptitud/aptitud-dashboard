"use client";

import { cn } from "@/lib/utils";
import { Users2, Building2, Map } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    className?: string;
}

interface NavItemProps {
    icon: React.ReactNode;
    href: string;
    label: string;
}

function NavItem({ icon, href, label }: NavItemProps) {
    return (
        <Link href={href} className="flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground" title={label}>
            {icon}
        </Link>
    );
}

export function Header({ className }: HeaderProps) {
    return (
        <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
            <div className="container flex h-14 items-center">
                <nav className="flex items-center gap-2">
                    <NavItem icon={<Building2 className="h-5 w-5" />} href="/customers" label="Customers" />
                    <NavItem icon={<Users2 className="h-5 w-5" />} href="/employees" label="Employees" />
                    <NavItem icon={<Map className="h-5 w-5" />} href="/map" label="Map" />
                </nav>
            </div>
        </header>
    );
}
