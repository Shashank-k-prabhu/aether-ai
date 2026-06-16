import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Radial glow — subtle, centered */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-primary/8 blur-[120px] opacity-60" />
      </div>

      {/* Thin grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Enterprise AI Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
            AI agents that{" "}
            <span className="text-primary">work</span>
            <br />
            while you sleep.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Aether AI builds, deploys, and manages intelligent agents for customer
            support, research, and workflow automation — integrated directly into
            your enterprise stack.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="h-11 px-8 bg-primary text-primary-foreground hover:bg-[#0284C7] rounded-lg font-semibold text-sm transition-colors"
            >
              <Link href="/register">Start building free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 px-8 border-border bg-transparent text-foreground hover:bg-card hover:border-primary rounded-lg font-semibold text-sm transition-colors"
            >
              <Link href="/services">See the platform →</Link>
            </Button>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="mt-20 mx-auto max-w-5xl">
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
            {/* Fake window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#0D1117]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-4 text-xs text-muted-foreground font-mono">
                aether.ai / dashboard
              </span>
            </div>
            {/* Fake dashboard grid */}
            <div className="p-6 grid grid-cols-3 gap-4 bg-[#0D1117]">
              {[
                { label: "Active Agents", value: "1,240", delta: "+12%" },
                { label: "Tasks Completed", value: "84.9k", delta: "+24%" },
                { label: "Avg. Response", value: "1.2s", delta: "-8%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-accent mt-1">{stat.delta} this week</p>
                </div>
              ))}
              <div className="col-span-2 rounded-lg border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground mb-3">Agent Activity</p>
                <div className="flex items-end gap-1 h-16">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-primary/30"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground mb-3">Status</p>
                {["GitHub Reviewer", "Slack Reporter", "DB Optimizer"].map((a, i) => (
                  <div key={a} className="flex items-center gap-2 mb-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        i === 1 ? "bg-accent" : i === 2 ? "bg-destructive" : "bg-primary"
                      }`}
                    />
                    <span className="text-xs text-muted-foreground truncate">{a}</span>
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
