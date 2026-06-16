"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

const faqs = [
  {
    q: "How does Aether AI handle data security and SOC 2 compliance?",
    a: "We are SOC 2 Type II certified. All agent logs, traces, and data payloads are encrypted at rest (AES-256) and in transit (TLS 1.3). Access to third-party endpoints is protected via encrypted environment values with strict RBAC.",
  },
  {
    q: "What is the typical deployment timeline for a custom agent?",
    a: "Standard agents using pre-built templates are running in sandbox environments within 24 hours. Custom agents with bespoke workflow logic typically take 3–5 business days to align and verify in staging.",
  },
  {
    q: "Can agents connect to legacy internal databases and on-prem systems?",
    a: "Yes. Aether supports secure connections via SSH tunneling, IP whitelisting, or our secure connector gateway that runs locally inside your private subnet without exposing data externally.",
  },
  {
    q: "How are task execution failures handled?",
    a: "On unexpected failures, the runtime logs the full trace, triggers an automatic fallback retry loop, and sends a secure alert to your designated on-call operator if manual resolution is needed.",
  },
  {
    q: "How does pricing scale with usage?",
    a: "Pricing is based on active agent runtime hours and task execution volume. Enterprise contracts are available for dedicated sandboxed runtimes and unlimited execution traces.",
  },
  {
    q: "What integrations come out of the box?",
    a: "Native connectors include Slack, GitHub, Jira, HubSpot, Salesforce, Stripe, Postgres, MySQL, and 40+ enterprise tools. Custom connectors are available via our REST API or webhook event system.",
  },
];

export function Faq() {
  return (
    <Section className="bg-black py-24 border-t border-zinc-900">
      <Container>
        <div className="max-w-2xl mb-16 text-left">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Common questions.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full divide-y divide-zinc-900 border-t border-zinc-900">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b-0 py-1"
              >
                <AccordionTrigger className="text-[13px] font-semibold text-zinc-200 hover:text-primary hover:no-underline transition-colors text-left font-mono py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[13px] text-zinc-400 leading-[1.75] pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </Section>
  );
}
