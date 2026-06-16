import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-primary" />
          <span className="text-sm font-semibold tracking-tight text-foreground">Aether AI</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/about" className="text-xs font-medium text-muted-foreground hover:text-foreground transition">
            About
          </Link>
          <Link href="/services" className="text-xs font-medium text-muted-foreground hover:text-foreground transition">
            Services
          </Link>
          <Link href="/login" className="text-xs font-medium text-muted-foreground hover:text-foreground transition">
            Login
          </Link>
          <Link href="/register" className="text-xs font-medium text-muted-foreground hover:text-foreground transition">
            Register
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Aether AI Corp. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
export default Footer;
