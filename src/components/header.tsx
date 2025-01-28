import { cn } from "@/lib/utils";
import { Users2, Building2, Map, BadgeEuro } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "@/components/auth/user-menu";
import { MoreMenu } from "./more-menu";

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
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
      title={label}
    >
      {icon}
    </Link>
  );
}

export async function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2",
        className,
      )}
    >
      <div className="flex h-14 items-center justify-between">
        <nav className="flex items-center gap-2">
          <NavItem icon={<Building2 className="h-5 w-5" />} href="/customers" label="Customers" />
          <NavItem icon={<Users2 className="h-5 w-5" />} href="/employees" label="Employees" />
          <NavItem icon={<Map className="h-5 w-5" />} href="/map" label="Map" />
          <NavItem icon={<BadgeEuro className="h-5 w-5" />} href="/finance" label="Finance" />
          <MoreMenu />
        </nav>
        <div className="hidden flex-1 justify-center md:flex">
          <h1 className="text-lg font-semibold">Aptitud Dashboard</h1>
        </div>
        <div className="flex items-center h-8 w-8">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
