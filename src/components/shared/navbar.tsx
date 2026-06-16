import Link from "next/link";
import { Container } from "./container";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-primary" />
            Aether AI
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Services
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Dashboard
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground text-sm font-medium">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-hover text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
