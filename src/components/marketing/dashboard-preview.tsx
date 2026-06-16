"use client";

import { Container } from "@/components/shared/container";

export function DashboardPreview() {
  return (
    <section className="relative py-24 bg-black overflow-hidden border-t border-border/40">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-primary/5 blur-[100px] opacity-40" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Monitor Every Agent In Real Time
          </h2>
          <p className="text-muted-foreground text-lg">
            Complete visibility over your autonomous workflows. Track task throughput, active agents, and live execution traces.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl transition-all duration-300 hover:border-primary/20">
            {/* Fake window chrome */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#090D12]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">
                  aether.ai / dashboard
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-500 font-mono tracking-wider uppercase">Live Connection</span>
              </div>
            </div>

            {/* Fake dashboard grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#090D12]">
              {[
                { label: "Active Agents", value: "1,240", delta: "+12%", color: "text-emerald-500" },
                { label: "Tasks Completed", value: "84.9k", delta: "+24%", color: "text-emerald-500" },
                { label: "Avg. Response", value: "1.2s", delta: "-8%", color: "text-emerald-500" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/60 bg-[#0E131F]/40 p-4 transition-all duration-300 hover:bg-[#0E131F]/80 hover:border-border"
                >
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-bold text-foreground font-mono">{stat.value}</p>
                    <span className={`text-xs font-semibold font-mono ${stat.color}`}>{stat.delta}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground/80 mt-1">compared to last week</p>
                </div>
              ))}

              <div className="md:col-span-2 rounded-lg border border-border/60 bg-[#0E131F]/40 p-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs text-muted-foreground">Agent Throughput (tasks/sec)</p>
                  <span className="text-[10px] text-muted-foreground/80 font-mono">1m interval</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100, 80, 90, 65, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-primary/25 hover:bg-primary/50 transition-all duration-200"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-[#0E131F]/40 p-4">
                <p className="text-xs text-muted-foreground mb-3">System Status</p>
                {["GitHub Reviewer", "Slack Reporter", "DB Optimizer"].map((a, i) => (
                  <div key={a} className="flex items-center justify-between py-1 border-b border-border/30 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          i === 1 ? "bg-amber-400" : i === 2 ? "bg-red-400 animate-pulse" : "bg-emerald-400"
                        }`}
                      />
                      <span className="text-xs text-muted-foreground font-mono truncate">{a}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/60">
                      {i === 1 ? "Idle" : i === 2 ? "Error" : "Running"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
