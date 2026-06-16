import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — Aether AI',
  description: 'Manage your intelligent AI agents from the Aether AI dashboard.',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center gap-6 p-8">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center space-y-4 max-w-lg">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Authenticated
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back,{' '}
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            {session.user?.name ?? session.user?.email}
          </span>
        </h1>

        <p className="text-[#A1A1AA] text-base leading-relaxed">
          Dashboard shell — Phase 9 will wire up the full sidebar, header, and agent management UI here.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-8 text-sm">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-[#71717A] mb-1">Email</p>
            <p className="text-white font-medium truncate">{session.user?.email}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-[#71717A] mb-1">Role</p>
            <p className="text-white font-medium capitalize">{session.user?.role}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
