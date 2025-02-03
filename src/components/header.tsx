import { cn } from "@/lib/utils";
import { Users2, Building2, Map, BadgeEuro, RefreshCw } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "@/components/auth/user-menu";
import { refreshAll } from "@/server-actions/refresh";

interface HeaderProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  href?: string;
  label: string;
  onClick?: () => void;
}

function NavItem({ icon, href, label, onClick }: NavItemProps) {
  if (onClick) {
    return (
      <button onClick={onClick} className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground" title={label}>
        {icon}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground" title={label}>
        {icon}
      </Link>
    );
  }

  return <div className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground">{icon}</div>;
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
        <nav className="flex-1 flex items-center gap-2">
          <NavItem icon={<Building2 className="h-5 w-5" />} href="/customers" label="Kunder" />
          <NavItem icon={<Users2 className="h-5 w-5" />} href="/employees" label="Anställda" />
          <NavItem icon={<Map className="h-5 w-5" />} href="/map" label="Karta" />
          <NavItem icon={<BadgeEuro className="h-5 w-5" />} href="/finance" label="Finanser" />
          <NavItem icon={<RefreshCw className="h-5 w-5" />} label="Rensa cachen" onClick={refreshAll} />
        </nav>
        <div className="flex-1 text-center invisible md:visible">
          <h1 className="text-lg font-semibold">Aptitud Dashboard</h1>
        </div>
        <div className="flex-1 justify-end flex items-center h-8 w-8">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
