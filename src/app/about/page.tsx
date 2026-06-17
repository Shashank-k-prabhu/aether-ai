"use client";

import { motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Activity,
  Lock,
  Zap,
  BarChart3,
  ArrowRight,
  Shield,
  Server,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] } as Transition,
});

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
};

const corePrinciples = [
  {
    icon: Activity,
    tag: "Reliability",
    title: "Built to stay online.",
    desc: "Our runtimes auto-recover from transient failures, token limit breaches, and schema changes. Workflows continue without manual intervention.",
  },
  {
    icon: Eye,
    tag: "Transparency",
    title: "Every action is observable.",
    desc: "Every agent decision, tool call, and data access point is logged, timestamped, and queryable. No black-box behavior at any layer.",
  },
  {
    icon: Lock,
    tag: "Security",
    title: "Zero lateral movement.",
    desc: "Agent runtimes are containerized with scoped permissions. All networks are isolated by default. Credentials never enter model context.",
  },
  {
    icon: Zap,
    tag: "Efficiency",
    title: "Optimized for production throughput.",
    desc: "Pipeline execution is parallelized, cached, and rate-managed. Agents accomplish more with fewer model calls, keeping cost and latency predictable.",
  },
];

const leadershipPrinciples = [
  {
    num: "01",
    title: "Audit everything by default.",
    desc: "Log every agent action, every tool call, every state change. Not because compliance requires it, but because debugging production AI without an audit trail is operationally impossible.",
  },
  {
    num: "02",
    title: "Determinism over black-box flexibility.",
    desc: "An agent that consistently does the expected thing is more valuable than one that occasionally does the brilliant thing. We design systems with rigid operational boundaries, not open-ended prompts.",
  },
  {
    num: "03",
    title: "Infrastructure thinking, not model tuning.",
    desc: "We design platforms the same way platform teams build databases: for correctness, fault tolerance, and controlled recovery — not for impressive demos.",
  },
  {
    num: "04",
    title: "Security shapes architecture from the start.",
    desc: "Security is not a feature added at the end of the roadmap. Every integration surface, permission scope, and data pathway is designed with least-privilege and isolation as first principles.",
  },
  {
    num: "05",
    title: "Complexity is hidden from the operator.",
    desc: "Enterprise teams should configure, deploy, and audit agents without understanding LLM internals. We absorb the complexity so operators can focus on outcomes.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 pt-24">

        {/* ─── 1. Hero ───────────────────────────────────────────── */}
        <section className="relative py-28 border-b border-zinc-900 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-primary/5 blur-[130px] pointer-events-none" />

          <Container className="relative z-10">
            <motion.div {...fadeUp()} className="max-w-4xl">
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-5">
                About Aether AI
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08] mb-7">
                <span className="text-zinc-100">Not an AI assistant.</span>
                <br />
                <span className="text-zinc-500">Enterprise-grade infrastructure</span>
                <br />
                <span className="text-zinc-100">for autonomous operations.</span>
              </h1>
              <p className="text-[15px] text-zinc-400 leading-[1.85] max-w-2xl">
                Aether AI bridges the gap between speculative AI capabilities and the production requirements of
                enterprise operations — focused on control, traceability, and determinism at every layer.
              </p>
            </motion.div>

            {/* Inline trust signals */}
            <motion.div {...fadeUp(0.15)} className="flex flex-wrap gap-3 mt-10">
              {["SOC 2 Type II Certified", "Containerized Runtimes", "Full Audit Logging", "RBAC at every layer"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wide border border-zinc-800 text-zinc-500 px-3 py-1.5 rounded-md bg-zinc-950/40"
                  >
                    {tag}
                  </span>
                )
              )}
            </motion.div>
          </Container>
        </section>

        {/* ─── 2. Why We Exist ───────────────────────────────────── */}
        <Section className="border-b border-zinc-900 py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left: Stats column */}
              <motion.div {...fadeUp(0)} className="lg:col-span-4 space-y-10">
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  Why We Exist
                </p>

                <div className="space-y-2">
                  <p className="text-[64px] leading-none font-bold tracking-tight text-zinc-100 font-mono">
                    78<span className="text-primary text-5xl">%</span>
                  </p>
                  <p className="text-[13px] text-zinc-400 leading-[1.7] max-w-xs">
                    of enterprise AI pilots fail in production within 90 days — not because the model fails,
                    but because the infrastructure around it does.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[64px] leading-none font-bold tracking-tight text-zinc-100 font-mono">
                    3<span className="text-primary text-5xl">×</span>
                  </p>
                  <p className="text-[13px] text-zinc-400 leading-[1.7] max-w-xs">
                    faster time-to-production for teams using structured agent runtimes over custom-built
                    orchestration layers.
                  </p>
                </div>
              </motion.div>

              {/* Right: Narrative */}
              <motion.div
                {...fadeUp(0.1)}
                className="lg:col-span-8 lg:pl-10 lg:border-l lg:border-zinc-800/50 space-y-6"
              >
                <p className="text-[17px] text-zinc-200 leading-[1.9] font-light">
                  Every operations team we spoke to had the same underlying problem: they had adopted AI tools
                  and watched them fail at the production boundary.
                </p>
                <p className="text-[14px] text-zinc-400 leading-[1.85]">
                  Black-box outputs with no audit trail. Agents that hallucinate in edge cases with no fallback
                  logic. Custom orchestration layers that collapse under real data payloads. Integration glue
                  code that breaks on every API schema update.
                </p>
                <p className="text-[14px] text-zinc-400 leading-[1.85]">
                  Aether AI was built because deploying autonomous agents at enterprise scale requires
                  infrastructure-grade thinking — not just better prompts or bigger context windows. The models
                  are already capable enough. What&apos;s missing is the secure, auditable, failure-tolerant
                  runtime layer that production operations demand.
                </p>
                <p className="text-[14px] text-zinc-400 leading-[1.85]">
                  We are not building a better chatbot. We are building the operational substrate that makes
                  autonomous AI trustworthy.
                </p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* ─── 3. Mission ────────────────────────────────────────── */}
        <Section className="border-b border-zinc-900 py-24 bg-zinc-950/20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div {...fadeUp(0)} className="space-y-5">
                <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-widest">
                  <Target className="h-3.5 w-3.5" />
                  <span>Our Mission</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 leading-[1.25] tracking-tight">
                  To make autonomous operations auditable, secure, and production-ready.
                </h2>
                <p className="text-[13px] text-zinc-400 leading-[1.8]">
                  We build secure runtimes and developer tooling that enable companies to delegate complex,
                  multi-step workflows to AI agents — without losing visibility, control, or compliance
                  guarantees. From configuration to live execution, every layer is observable.
                </p>
                <div className="pt-2 space-y-2">
                  {[
                    "Auditable execution at every layer",
                    "Human escalation always within reach",
                    "Compliance-ready from day one",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[12px] text-zinc-400">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="space-y-5">
                <div className="flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-widest">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Our Vision</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 leading-[1.25] tracking-tight">
                  Enterprise software that operates autonomously — not independently.
                </h2>
                <p className="text-[13px] text-zinc-400 leading-[1.8]">
                  The future of operations is autonomous, but autonomy without accountability is a liability.
                  We are building toward a world where AI agents handle complex operational work safely —
                  within enforced boundaries, with full audit trails and human escalation always within reach.
                </p>
                <div className="pt-2 space-y-2">
                  {[
                    "Autonomous does not mean uncontrolled",
                    "Scalable across teams and geographies",
                    "Self-healing with deterministic fallbacks",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-[12px] text-zinc-400">
                      <div className="h-1 w-1 rounded-full bg-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* ─── 4. Core Principles ────────────────────────────────── */}
        <Section className="border-b border-zinc-900 py-24">
          <Container>
            <motion.div {...fadeUp()} className="max-w-2xl mb-14">
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
                Foundations
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-3">
                Core Engineering Principles
              </h2>
              <p className="text-[13px] text-zinc-400 leading-[1.75]">
                These four principles shape every architecture decision we make — from how agents store state
                to how we scope network access across isolated runtimes.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {corePrinciples.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.tag}
                    variants={staggerItem}
                    className="group p-7 rounded-xl border border-zinc-800/70 bg-zinc-950/40 hover:border-zinc-700/60 hover:bg-zinc-900/20 transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-primary transition-colors duration-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-md">
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-zinc-100 mb-2 tracking-tight">{p.title}</h3>
                    <p className="text-[13px] text-zinc-400 leading-[1.75]">{p.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </Container>
        </Section>

        {/* ─── 5. Leadership Principles ──────────────────────────── */}
        <Section className="border-b border-zinc-900 py-24 bg-zinc-950/20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Left: Section anchor */}
              <motion.div {...fadeUp()} className="lg:col-span-4 lg:sticky lg:top-28 self-start">
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
                  Operating Philosophy
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-4">
                  Leadership Principles
                </h2>
                <p className="text-[13px] text-zinc-400 leading-[1.75]">
                  These are not values statements. These are the operating principles that determine how we
                  architect systems, make technical decisions, and evaluate trade-offs under pressure.
                </p>

                <div className="mt-8 flex items-center gap-3 p-4 rounded-xl border border-zinc-800/50 bg-zinc-950/40">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-zinc-200 font-mono">Engineering-first culture</p>
                    <p className="text-[11px] text-zinc-500">Principles over processes</p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Principles list */}
              <div className="lg:col-span-8 divide-y divide-zinc-900">
                {leadershipPrinciples.map((lp, idx) => (
                  <motion.div
                    key={lp.num}
                    {...fadeUp(idx * 0.07)}
                    className="flex items-start gap-7 py-8 group"
                  >
                    <span className="text-[22px] font-bold font-mono text-zinc-800 group-hover:text-zinc-700 transition-colors shrink-0 w-10 select-none pt-0.5">
                      {lp.num}
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="text-[14px] font-semibold text-zinc-100 tracking-tight group-hover:text-white transition-colors">
                        {lp.title}
                      </h3>
                      <p className="text-[13px] text-zinc-400 leading-[1.8]">{lp.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* ─── 6. CTA ────────────────────────────────────────────── */}
        <Section className="py-24">
          <Container>
            <motion.div
              {...fadeUp()}
              className="relative rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-12 overflow-hidden"
            >
              {/* Radial glow */}
              <div className="absolute inset-0 radial-glow pointer-events-none" />
              {/* Subtle top border accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <Server className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-primary">
                    Get Started
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-4">
                  Ready to deploy autonomous agents with production-grade reliability?
                </h2>
                <p className="text-[13px] text-zinc-400 leading-[1.75] mb-8 max-w-lg">
                  Start in our secure sandbox environment today, or contact our engineering team for enterprise
                  deployment assistance and custom integration architecture.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="h-10 px-7 bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg font-medium text-[13px] transition-all shadow-[0_0_20px_rgba(14,165,233,0.12)]"
                  >
                    <Link href="/register">Start building free</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 px-7 border-zinc-800 bg-zinc-950/30 text-zinc-300 hover:bg-zinc-900 rounded-lg font-medium text-[13px] transition-all"
                  >
                    <Link href="/services">
                      Explore our services <ArrowRight className="h-3.5 w-3.5 ml-1.5 inline" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>

      </main>

      <Footer />
    </div>
  );
}
