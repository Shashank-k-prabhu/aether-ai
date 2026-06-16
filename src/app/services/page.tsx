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
  Bot,
  Search,
  GitBranch,
  Database,
  ArrowRight,
  CircleDot,
  Layers,
  Lock,
  Activity,
  CheckCircle2,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] } as Transition,
});

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const metrics = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<15s", label: "Avg. response time" },
  { value: "40+", label: "Enterprise integrations" },
  { value: "SOC 2 II", label: "Compliance certified" },
];

const services = [
  {
    id: "support",
    icon: Bot,
    tag: "Customer Support",
    title: "Customer Support Agents",
    overview:
      "Deploy intelligent agents that respond to client queries, access knowledge records, perform account actions, and manage CRM records securely and at scale — 24/7, across every channel.",
    capabilities: [
      "Inbound email and live chat triage",
      "Dynamic CRM syncing (Salesforce / HubSpot)",
      "Secure escalation queue integration",
      "Response time under 15 seconds end-to-end",
    ],
    outcomes: [
      "65% reduction in tier-1 support volumes",
      "CSAT ratings maintained consistently above 95%",
      "Zero escalation routing errors across all deployments",
    ],
    workflow:
      "Customer query → Classifier categorizes sentiment and intent → Agent retrieves billing context from Postgres → Resolution draft generated and approved → Reply dispatched via SES.",
  },
  {
    id: "research",
    icon: Search,
    tag: "Research & Intelligence",
    title: "Research Agents",
    overview:
      "Gather, query, analyze, and synthesize large volumes of data from structured databases, document repositories, and live web searches into structured, actionable briefings — on a schedule or on demand.",
    capabilities: [
      "Real-time web browsing and structured data extraction",
      "PDF and internal documentation synthesis",
      "Automated custom briefing generation on a schedule",
      "Parallel queries across 12+ sources simultaneously",
    ],
    outcomes: [
      "Saves up to 15 analyst hours per week per team",
      "Aggregates data from 12+ sources in parallel",
      "Delivers daily briefing reports automatically to Slack",
    ],
    workflow:
      "Trigger event → Agent searches web and internal logs → Generates Markdown summaries → Formats structured table → Delivers payload to configured Slack channels.",
  },
  {
    id: "workflow",
    icon: GitBranch,
    tag: "Workflow Automation",
    title: "Workflow Automation Agents",
    overview:
      "Orchestrate multi-step, multi-system operational flows deterministically. Configure execution dependencies, validation rules, and resilient error recovery policies without writing custom glue code.",
    capabilities: [
      "Cross-app webhook triggers and event handlers",
      "Self-healing execution retries with exponential backoff",
      "Granular data-mapping and payload transformations",
      "Full audit trail for every execution step",
    ],
    outcomes: [
      "Eliminates manual formatting errors completely",
      "Executes complex multi-step flows 10× faster than manual operators",
      "Full audit trace satisfying SOC 2 compliance requirements",
    ],
    workflow:
      "Webhook fires → Agent parses payload schema → Executes API posts sequentially → Validates execution state at each step → Confirms completion in database.",
  },
  {
    id: "integrations",
    icon: Database,
    tag: "Enterprise Integrations",
    title: "Enterprise Integration Agents",
    overview:
      "Automate synchronization pipelines across critical databases, identity directories, billing portals, and external applications without writing custom glue code or managing brittle cron jobs.",
    capabilities: [
      "Database state monitoring and reactive event triggers",
      "Active Directory and IAM synchronization",
      "Safe transactional record reconciliation and deduplication",
      "Configurable retry and conflict resolution policies",
    ],
    outcomes: [
      "Ensures zero status drift between synchronized systems",
      "Eliminates custom integration development cycles",
      "Triggers automatic resolution steps on sync errors",
    ],
    workflow:
      "Database event detects state delta → Agent validates context → Updates HubSpot / Salesforce → Reconciles billing info → Confirms sync completion.",
  },
];

const deploymentSteps = [
  {
    step: "01",
    name: "Configure Sandbox",
    desc: "Define permissions, environment variables, and memory states for the agent runtime.",
  },
  {
    step: "02",
    name: "Draft Agent Logic",
    desc: "Instruct agent goals and task parameters in plain language or via structured config.",
  },
  {
    step: "03",
    name: "Verify in Dry-Run",
    desc: "Run in dry-run mode to audit step logs, DB query traces, and API call outputs.",
  },
  {
    step: "04",
    name: "Promote to Production",
    desc: "Connect active triggers and monitor live execution through real-time dashboards.",
  },
];

const whyAether = [
  {
    icon: Layers,
    title: "Infrastructure-grade, not SaaS-grade",
    desc: "Built to handle enterprise data payloads, high-volume event streams, and production failure modes — not demo environments. Our runtimes are designed for correctness under sustained load, not proof-of-concept showcases.",
    highlights: ["Built for 100k+ events/day", "Horizontal execution scaling", "No cold-start latency"],
  },
  {
    icon: Lock,
    title: "Security is the architecture",
    desc: "Agents have zero lateral network access. Credentials never enter model context. Every permission scope is declared, audited, and enforced at the container boundary before any workflow runs.",
    highlights: ["SOC 2 Type II certified", "Zero-trust container network", "Least-privilege by default"],
  },
  {
    icon: Activity,
    title: "Full observability by default",
    desc: "Every step of every workflow is logged, timestamped, and queryable. No black-box execution. Every tool call, API response, and state transition is auditable without custom instrumentation or third-party add-ons.",
    highlights: ["Cryptographically signed logs", "Real-time execution dashboards", "Query audit trail via API"],
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 pt-24">

        {/* ─── 1. Hero ─────────────────────────────────────────────── */}
        <section className="relative py-28 border-b border-zinc-900 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-primary/5 blur-[130px] pointer-events-none" />

          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

              <motion.div {...fadeUp()} className="lg:col-span-7 space-y-6">
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  Platform Services
                </p>
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-zinc-100">
                  Specialized agents.<br />
                  <span className="text-zinc-400">Secure execution.</span><br />
                  Production-ready.
                </h1>
                <p className="text-[15px] text-zinc-400 leading-[1.85] max-w-xl">
                  Deploy sandboxed AI agents tailored for your specific operations — fully integrated,
                  deterministically controlled, and audit-ready from day one.
                </p>

                {/* Service anchor links */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {services.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 px-3 py-1.5 rounded-md bg-zinc-950/40 transition-all duration-200"
                    >
                      <s.icon className="h-3 w-3" />
                      {s.tag}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Right: Uptime / certification callout */}
              <motion.div {...fadeUp(0.15)} className="lg:col-span-5">
                <div className="p-6 rounded-xl border border-zinc-800/70 bg-zinc-950/40 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wide">
                        All systems operational
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-600">aether-status.io</span>
                  </div>
                  {[
                    { label: "Agent Runtime", status: "Operational", uptime: "99.97%" },
                    { label: "Integration Gateway", status: "Operational", uptime: "99.94%" },
                    { label: "Audit Log Store", status: "Operational", uptime: "100.00%" },
                    { label: "Execution Sandbox", status: "Operational", uptime: "99.99%" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-mono text-zinc-400">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-emerald-400 font-mono">{item.uptime}</span>
                        <span className="text-[10px] font-mono text-zinc-600">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </Container>
        </section>

        {/* ─── Metrics Strip ─────────────────────────────────────── */}
        <div className="border-b border-zinc-900 bg-zinc-950/30">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-900">
              {metrics.map((m) => (
                <div key={m.label} className="py-8 px-6 text-center">
                  <p className="text-2xl sm:text-3xl font-bold font-mono text-zinc-100 tracking-tight mb-1">
                    {m.value}
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{m.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>

        {/* ─── 2–5. Service Sections ─────────────────────────────── */}
        {services.map((service, idx) => {
          const Icon = service.icon;
          const isAlternate = idx % 2 !== 0;

          return (
            <Section
              key={service.id}
              id={service.id}
              className="border-b border-zinc-900 py-24 scroll-mt-24"
            >
              <Container>

                {/* Section label */}
                <motion.div {...fadeUp()} className="flex items-center gap-3 mb-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 max-w-[40px] bg-zinc-800" />
                  <span className="text-[9px] font-mono uppercase tracking-widest border border-zinc-800 text-zinc-500 px-2.5 py-1 rounded-md bg-zinc-950/40">
                    {service.tag}
                  </span>
                </motion.div>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start ${
                    isAlternate ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Overview Panel */}
                  <motion.div
                    {...fadeUp(0)}
                    className={`lg:col-span-5 space-y-6 ${isAlternate ? "lg:order-last" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                      {service.title}
                    </h2>
                    <p className="text-[13px] text-zinc-400 leading-[1.85]">{service.overview}</p>

                    <div className="space-y-3 pt-1">
                      <h4 className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 pb-1 border-b border-zinc-900">
                        Key Capabilities
                      </h4>
                      <ul className="space-y-2.5">
                        {service.capabilities.map((c, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2.5 text-[13px] text-zinc-400">
                            <CircleDot className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Details Panel */}
                  <motion.div
                    {...fadeUp(0.1)}
                    className={`lg:col-span-7 space-y-5 ${
                      isAlternate ? "lg:order-first lg:pr-8" : "lg:pl-8"
                    }`}
                  >
                    {/* Business Outcomes */}
                    <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-zinc-900/50">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <h4 className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">
                          Business Outcomes
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {service.outcomes.map((o, oIdx) => (
                          <li
                            key={oIdx}
                            className="flex items-start gap-3 text-[13px] text-zinc-300 leading-[1.65]"
                          >
                            <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Execution Flow */}
                    <div className="p-6 rounded-xl border border-zinc-900 bg-[#07090e] space-y-3">
                      <h4 className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 pb-3 border-b border-zinc-900/50">
                        Example Execution Flow
                      </h4>
                      <div className="bg-black/60 rounded-lg border border-zinc-900/60 p-4">
                        <p className="text-[11px] font-mono text-zinc-400 leading-[1.9]">
                          {service.workflow.split("→").map((step, sIdx, arr) => (
                            <span key={sIdx}>
                              <span className="text-zinc-300">{step.trim()}</span>
                              {sIdx < arr.length - 1 && (
                                <span className="text-primary mx-1.5">→</span>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    {/* CTA link */}
                    <div className="flex items-center justify-end">
                      <Button
                        asChild
                        variant="ghost"
                        className="text-[11px] font-mono text-zinc-500 hover:text-primary hover:bg-transparent px-0 h-auto gap-1.5 transition-colors"
                      >
                        <Link href="/register">
                          Deploy this agent <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </Container>
            </Section>
          );
        })}

        {/* ─── 6. Deployment Process ─────────────────────────────── */}
        <Section className="border-b border-zinc-900 py-24 bg-zinc-950/20">
          <Container>
            <motion.div {...fadeUp()} className="max-w-2xl mb-14">
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
                Process
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-3">
                Deployment Pipeline
              </h2>
              <p className="text-[13px] text-zinc-400 leading-[1.75]">
                From sandbox to production in four steps. Every stage is audited and reversible.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {deploymentSteps.map((s, idx) => (
                <motion.div
                  key={s.step}
                  {...fadeUp(idx * 0.08)}
                  className="relative p-6 border border-zinc-800/70 bg-zinc-950/40 rounded-xl hover:border-zinc-700/60 transition-all duration-300"
                >
                  {/* Step number as overlay */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center relative z-10">
                      <span className="text-[11px] font-bold font-mono text-primary">{s.step}</span>
                    </div>
                    <span className="text-[32px] font-bold font-mono text-zinc-900 select-none leading-none">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-[13px] font-semibold font-mono text-zinc-200 mb-2">{s.name}</h3>
                  <p className="text-[12px] text-zinc-400 leading-[1.7]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ─── 7. Why Aether AI ──────────────────────────────────── */}
        <Section className="border-b border-zinc-900 py-24">
          <Container>
            <motion.div {...fadeUp()} className="max-w-2xl mb-14">
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
                Why Aether AI
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-3">
                Not another automation tool.
              </h2>
              <p className="text-[13px] text-zinc-400 leading-[1.75]">
                Generic workflow platforms treat AI as an afterthought. We built Aether from the ground up
                for enterprise-grade agent operations — with security, observability, and reliability as
                foundational constraints, not optional add-ons.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {whyAether.map((w) => {
                const Icon = w.icon;
                return (
                  <motion.div
                    key={w.title}
                    variants={staggerItem}
                    className="group p-7 rounded-xl border border-zinc-800/70 bg-zinc-950/40 hover:border-zinc-700/60 hover:bg-zinc-900/10 transition-all duration-300 cursor-default flex flex-col"
                  >
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-primary transition-colors duration-200 w-fit mb-5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-zinc-100 mb-3 tracking-tight">{w.title}</h3>
                    <p className="text-[13px] text-zinc-400 leading-[1.75] mb-5 flex-1">{w.desc}</p>
                    <div className="space-y-2 pt-3 border-t border-zinc-900">
                      {w.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-[11px] text-zinc-500">
                          <div className="h-1 w-1 rounded-full bg-primary" />
                          <span className="font-mono">{h}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Inline comparison note */}
            <motion.div {...fadeUp(0.2)} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                  Generic automation platforms
                </p>
                <ul className="space-y-2">
                  {[
                    "Credentials stored in plaintext env vars",
                    "No audit trail without manual logging setup",
                    "Agents stop on first error",
                    "Execution is a black box",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12px] text-zinc-500">
                      <span className="text-red-500/70">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-zinc-800/70 bg-zinc-950/40 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  Aether AI
                </p>
                <ul className="space-y-2">
                  {[
                    "Credentials scoped to container, never in context",
                    "Full cryptographic audit log by default",
                    "Self-healing with configurable fallback policies",
                    "Every step observable, queryable, and replayable",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[12px] text-zinc-300">
                      <span className="text-emerald-400">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* ─── 8. CTA ──────────────────────────────────────────────── */}
        <Section className="py-24">
          <Container>
            <motion.div
              {...fadeUp()}
              className="relative rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-12 overflow-hidden text-center"
            >
              {/* Radial glow */}
              <div className="absolute inset-0 radial-glow pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  Ready to deploy
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                  Ready to automate secure operations?
                </h2>
                <p className="text-[13px] text-zinc-400 leading-[1.75]">
                  Start building agents in our secure sandbox today, or contact our engineering team for
                  assistance with complex custom network configurations and enterprise rollouts.
                </p>
                <div className="flex justify-center flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    asChild
                    className="h-10 px-7 bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg font-medium text-[13px] transition-all shadow-[0_0_20px_rgba(14,165,233,0.12)]"
                  >
                    <Link href="/register">Start free trial</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 px-7 border-zinc-800 bg-zinc-950/30 text-zinc-300 hover:bg-zinc-900 rounded-lg font-medium text-[13px] transition-all"
                  >
                    <Link href="mailto:support@aether.ai">
                      Contact engineering <ArrowRight className="h-3.5 w-3.5 ml-1.5 inline" />
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
