import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "./ui/button";
import { ConnectWallet } from "./connect-wallet";
import { Logo } from "./logo";

const navItems = [
  {
    label: "Markets",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/portfolio",
  },
];

export function Nav() {
  return (
    <header className="flex items-center h-12 justify-between px-4 border-b border-border">
      <Logo className="w-10 h-10" />
      <div className="flex items-center gap-4">
        <nav>
          {navItems.map((item) => (
            <Link
              className={cn(buttonVariants({ variant: "ghost" }))}
              key={item.href}
              to={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ConnectWallet />
      </div>
    </header>
  );
}
