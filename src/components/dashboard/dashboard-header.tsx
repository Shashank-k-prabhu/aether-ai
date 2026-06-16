"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, Bell, Shield, Terminal, LogOut, ExternalLink } from "lucide-react";
import { DashboardSidebar } from "./dashboard-sidebar";

interface HeaderProps {
  session: Session;
}

export function DashboardHeader({ session }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Simple breadcrumbs mapping
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname.startsWith("/dashboard/agents")) return "Agents";
    if (pathname.startsWith("/dashboard/users")) return "Users Admin";
    return "Dashboard";
  };

  const userInitials = session.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : session.user?.email
    ? session.user.email[0].toUpperCase()
    : "U";

  return (
    <header className="h-16 border-b border-zinc-900 bg-[#09090B]/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      {/* Mobile Sidebar Trigger & Breadcrumb */}
      <div className="flex items-center gap-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-zinc-400 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-[#09090B] border-r border-zinc-900">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <DashboardSidebar
              userRole={session.user?.role}
              onClose={() => setIsOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-4">
        {/* Connection status indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AETHER-NET CONNECTED
        </div>

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-950 p-0 overflow-hidden">
              <Avatar className="h-full w-full rounded-lg">
                <AvatarFallback className="bg-zinc-900 text-zinc-300 font-semibold font-mono text-xs rounded-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs font-semibold text-white leading-none font-mono">
                  {session.user?.name || "Aether Operator"}
                </p>
                <p className="text-[10px] font-mono text-zinc-500 leading-none truncate">
                  {session.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-900" />
            <DropdownMenuItem className="text-xs font-mono py-2 hover:bg-zinc-900 focus:bg-zinc-900 cursor-pointer">
              <Terminal className="h-3.5 w-3.5 mr-2 text-zinc-500" />
              Role: <span className="text-primary font-semibold capitalize ml-1">{session.user?.role}</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-xs font-mono py-2 hover:bg-zinc-900 focus:bg-zinc-900 cursor-pointer">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-2 text-zinc-500" />
                Go to Landing
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-900" />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-xs font-mono py-2 text-rose-400 focus:text-rose-400 hover:bg-rose-500/10 focus:bg-rose-500/10 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5 mr-2" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
