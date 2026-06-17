import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Users, Activity, Terminal, Zap } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";
import User from "@/models/User";
import mongoose from "mongoose";

export const metadata: Metadata = {
  title: "Dashboard Overview — Aether AI",
  description: "Manage your intelligent AI agents from the Aether AI dashboard.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const isAdmin = session.user?.role === "admin";

  // ── Fetch real stats from DB ──────────────────────────────────────────────
  await connectDB();

  // Agents: admin sees all, user sees only their own
  const agentQuery =
    isAdmin ? {} : { createdBy: new mongoose.Types.ObjectId(session.user.id) };

  const [totalAgents, activeAgents, totalUsers] = await Promise.all([
    Agent.countDocuments(agentQuery),
    Agent.countDocuments({ ...agentQuery, status: "running" }),
    isAdmin ? User.countDocuments({}) : Promise.resolve(0),
  ]);

  // ── Stats cards ───────────────────────────────────────────────────────────
  const stats = [
    {
      name: "Total Agents",
      value: String(totalAgents),
      description: isAdmin ? "Across all operators" : "Deployed by you",
      icon: Bot,
      href: "/dashboard/agents",
      accent: "sky",
    },
    {
      name: "Active Agents",
      value: String(activeAgents),
      description: "Currently running",
      icon: Zap,
      href: "/dashboard/agents",
      accent: "emerald",
    },
    {
      name: "API Status",
      value: "Online",
      description: "All services operational",
      icon: Activity,
      href: "#",
      accent: "violet",
    },
  ];

  if (isAdmin) {
    stats.push({
      name: "Total Users",
      value: String(totalUsers),
      description: "Registered console accounts",
      icon: Users,
      href: "/dashboard/users",
      accent: "amber",
    });
  }

  const accentMap: Record<string, { border: string; icon: string; badge: string }> = {
    sky:     { border: "hover:border-sky-500/30",     icon: "group-hover:text-sky-400",     badge: "bg-sky-500/10 border-sky-500/20 text-sky-400" },
    emerald: { border: "hover:border-emerald-500/30", icon: "group-hover:text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
    violet:  { border: "hover:border-violet-500/30",  icon: "group-hover:text-violet-400",  badge: "bg-violet-500/10 border-violet-500/20 text-violet-400" },
    amber:   { border: "hover:border-amber-500/30",   icon: "group-hover:text-amber-400",   badge: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            CONSOLE ACTIVE
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-mono">
            Welcome, Operator{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {session.user?.name || session.user?.email}
            </span>
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Welcome to the Aether Control Panel. From here you can spin up intelligent autonomous AI agents, deploy custom models, and monitor system integrations.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/dashboard/agents"
              className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover px-4 py-2 text-xs font-mono font-medium text-black transition-colors"
            >
              <Bot className="h-3.5 w-3.5 mr-2" />
              Configure Agents
            </Link>
            {isAdmin && (
              <Link
                href="/dashboard/users"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 px-4 py-2 text-xs font-mono font-medium text-zinc-300 transition-colors"
              >
                <Users className="h-3.5 w-3.5 mr-2" />
                Manage Users
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = accentMap[stat.accent] ?? accentMap.sky;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className={`group block rounded-xl border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-950 p-6 transition-all duration-200 ${colors.border}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  {stat.name}
                </span>
                <div className={`rounded-lg p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 transition-colors ${colors.icon}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-white font-mono">
                  {stat.value}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">{stat.description}</p>
            </Link>
          );
        })}
      </div>

      {/* System Status Log */}
      <div className="rounded-xl border border-zinc-900 bg-zinc-950/50 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
          <Terminal className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-white">
            System Console Logs
          </h3>
        </div>
        <div className="font-mono text-xs text-zinc-500 space-y-2 leading-relaxed">
          <p><span className="text-emerald-500">[INFO]</span> Aether core initialized successfully.</p>
          <p><span className="text-emerald-500">[INFO]</span> Database connection established with primary cluster.</p>
          <p><span className="text-sky-500">[AUTH]</span> Operator session established for {session.user?.email}.</p>
          <p><span className="text-emerald-500">[SYNC]</span> {totalAgents} agent{totalAgents !== 1 ? "s" : ""} loaded — {activeAgents} running.</p>
          {isAdmin && (
            <p><span className="text-amber-500">[ADMIN]</span> {totalUsers} registered account{totalUsers !== 1 ? "s" : ""} on this node.</p>
          )}
          {activeAgents === 0 && (
            <p className="animate-pulse"><span className="text-amber-500">[WAIT]</span> No active agents. Deploy one to begin.</p>
          )}
        </div>
      </div>
    </div>
  );
}
