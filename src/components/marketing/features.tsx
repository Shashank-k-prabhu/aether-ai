"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, Search, GitBranch, Database } from "lucide-react";

const capabilities = [
  {
    icon: Bot,
    title: "24/7 Customer Support",
    description:
      "Autonomously ingest, categorize, and resolve customer support tickets across chat, email, and APIs — with escalation policies baked in.",
  },
  {
    icon: Search,
    title: "Autonomous Research",
    description:
      "Gather, analyze, and synthesize large volumes of data from structured stores, web sources, and proprietary DBs into actionable briefings.",
  },
  {
    icon: GitBranch,
    title: "Workflow Automation",
    description:
      "Execute multi-system workflows in real time. Automate document creation, transactional alerts, and complex business processes end-to-end.",
  },
  {
    icon: Database,
    title: "Enterprise Integrations",
    description:
      "Seamlessly sync and update data across HubSpot, Salesforce, Slack, Stripe, Postgres, and legacy internal platforms out of the box.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function Features() {
  return (
    <Section className="bg-black py-24 border-t border-zinc-900">
      <Container>
        <div className="max-w-2xl mb-16 text-left">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
            Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            Designed for secure execution.
          </h2>
          <p className="text-[13px] text-zinc-400 leading-relaxed max-w-xl">
            Deploy specialized agent infrastructure configured to handle high-value operational tasks at scale — without writing model code.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={cardVariants}>
                <Card className="h-full border border-zinc-800/70 bg-zinc-950/40 p-7 rounded-xl transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5 hover:bg-zinc-900/10 cursor-default group">
                  <CardHeader className="p-0 mb-4 flex flex-row items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-primary transition-colors duration-200">
                      <Icon className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-[13px] font-semibold text-zinc-200 group-hover:text-white transition-colors duration-200 font-mono tracking-tight">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-[13px] text-zinc-400 leading-[1.7]">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
