import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aether AI — Sign In',
  description: 'Sign in to your Aether AI account to manage your intelligent AI agents.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#09090B]">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(14,165,233,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(103,232,249,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 mb-8 flex items-center gap-2.5 group"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 shadow-lg shadow-sky-500/25 transition-transform group-hover:scale-105">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-white"
            aria-hidden="true"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl font-semibold tracking-tight text-white">
          Aether <span className="text-sky-400">AI</span>
        </span>
      </Link>

      {/* Auth card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div
          className="rounded-2xl border border-white/10 p-8 shadow-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {children}
        </div>
      </div>

      {/* Footer note */}
      <p className="relative z-10 mt-8 text-xs text-[#A1A1AA]">
        © {new Date().getFullYear()} Aether AI. All rights reserved.
      </p>
    </div>
  );
}
