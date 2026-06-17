"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Bot, Search, GitBranch, Check, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Bot,
    tag: "Customer Support",
    title: "Never leave a ticket unanswered.",
    description:
      "Deploy a support agent that resolves Tier-1 tickets, escalates edge cases, and updates your CRM — 24/7, across every channel.",
    bullets: ["Live chat & email triage", "CRM sync (Salesforce, HubSpot)", "Escalation routing"],
    href: "/services#support",
  },
  {
    icon: Search,
    tag: "Research",
    title: "Insight at the speed of thought.",
    description:
      "Agents that browse, synthesize, and summarize information from the web, internal docs, and databases into structured reports.",
    bullets: ["Web & document search", "Structured report generation", "Slack / email delivery"],
    href: "/services#research",
  },
  {
    icon: GitBranch,
    tag: "Workflow Automation",
    title: "Automate the repetitive. Focus on the strategic.",
    description:
      "Connect agents to your existing tools and let them handle data entry, approvals, notifications, and reporting autonomously.",
    bullets: ["Cross-tool orchestration", "Event-triggered execution", "Audit-ready logs"],
    href: "/services#workflow",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
};

export function ServicesPreview() {
  return (
    <Section className="bg-black py-24 border-t border-zinc-900">
      <Container>
        <div className="max-w-2xl mb-16 text-left">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            One platform. Every workflow.
          </h2>
          <p className="text-[13px] text-zinc-400 leading-relaxed">
            Pre-built, configurable agent foundations optimized for the critical work pipelines in your enterprise.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.tag} variants={cardVariants} className="flex">
                <Card className="bg-zinc-950/40 border border-zinc-800/70 flex flex-col justify-between p-7 rounded-xl transition-all duration-300 hover:bg-zinc-900/10 hover:border-zinc-700 cursor-default group w-full">
                  <CardHeader className="p-0 mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1 text-[10px] font-mono text-zinc-500 w-fit mb-5">
                      <Icon className="h-3 w-3 text-zinc-500 group-hover:text-primary transition-colors" />
                      {s.tag}
                    </div>
                    <CardTitle className="text-[15px] font-bold text-zinc-200 leading-snug group-hover:text-zinc-100 mb-3">
                      {s.title}
                    </CardTitle>
                    <CardDescription className="text-[13px] text-zinc-400 leading-[1.7]">
                      {s.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <ul className="space-y-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[12px] text-zinc-400">
                          <Check className="h-3 w-3 text-primary shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full justify-between border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 text-[11px] font-mono mt-2"
                    >
                      <Link href={s.href}>
                        <span>View agent →</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors text-[12px] font-mono"
          >
            <Link href="/services">Explore agent directory →</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
