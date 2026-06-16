"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/dashboard", label: "Dashboard" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-mono">
            <span className="w-4 h-4 rounded bg-primary" />
            AETHER AI
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-mono font-medium transition-colors ${
                    isActive ? "text-primary" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="ghost" className="text-zinc-400 hover:text-zinc-200 text-xs font-mono">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-hover text-xs font-mono font-semibold px-4 h-8 rounded-lg transition-colors">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-200 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-zinc-900 px-6 py-4 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-mono font-medium py-1 transition-colors ${
                    isActive ? "text-primary" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-900">
            <Button asChild variant="outline" className="w-full h-9 border-zinc-800 bg-transparent text-zinc-300 text-xs font-mono">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            </Button>
            <Button asChild className="w-full h-9 bg-primary text-primary-foreground hover:bg-primary-hover text-xs font-mono font-semibold">
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
