"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Bot,
  Users,
  LogOut,
  Terminal,
  Shield
} from "lucide-react";

interface SidebarProps {
  userRole?: string;
  className?: string;
  onClose?: () => void;
}

export function DashboardSidebar({ userRole, className, onClose }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/dashboard/agents",
      label: "Agents",
      icon: Bot,
      exact: false,
    },
  ];

  // Admin-only link
  if (userRole === "admin") {
    links.push({
      href: "/dashboard/users",
      label: "Users Admin",
      icon: Users,
      exact: false,
    });
  }

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href) && (href !== "/dashboard" || pathname === "/dashboard");
  };

  return (
    <div className={cn("flex flex-col h-full bg-[#09090B] border-r border-zinc-950 p-6", className)}>
      {/* Brand logo */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link 
          href="/" 
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-mono"
          onClick={onClose}
        >
          <span className="w-4 h-4 rounded bg-primary animate-pulse" />
          AETHER AI
        </Link>
        {userRole === "admin" && (
          <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 rounded-md px-1.5 py-0.5">
            ADMIN
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5">
        {links.map((link) => {
          const active = isActive(link.href, link.exact);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                active
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_12px_rgba(14,165,233,0.15)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110", active ? "text-primary" : "text-zinc-400")} />
              <span>{link.label}</span>
              {active && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Session Details */}
      <div className="pt-4 border-t border-zinc-900 space-y-3">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold uppercase">
            {userRole === "admin" ? <Shield className="h-4 w-4 text-primary" /> : <Terminal className="h-4 w-4 text-zinc-400" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-zinc-300 capitalize truncate">
              {userRole || "User"}
            </p>
            <p className="text-[10px] font-mono text-zinc-500 truncate">
              Console Active
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full justify-start text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-xs font-mono h-9 rounded-lg px-3"
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Disconnect
        </Button>
      </div>
    </div>
  );
}
