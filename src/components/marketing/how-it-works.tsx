"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

const steps = [
  {
    number: "01",
    title: "Define your agent",
    description:
      "Describe what the agent should do in plain language. Set goals, constraints, memory scope, and the tools it can access.",
  },
  {
    number: "02",
    title: "Connect your stack",
    description:
      "Authenticate your existing tools — Slack, GitHub, databases, APIs. Aether handles the integration layer automatically.",
  },
  {
    number: "03",
    title: "Deploy in one click",
    description:
      "Push your agent to production with a single command. Aether provisions the runtime, schedules triggers, and sets up monitoring.",
  },
  {
    number: "04",
    title: "Monitor and iterate",
    description:
      "Watch agent decisions in real time. Adjust behavior via the dashboard or API. Agents improve with every execution run.",
  },
];

function StepItem({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex gap-8 pb-12 last:pb-0"
    >
      {/* Node */}
      <div className="relative flex-shrink-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: index * 0.1 + 0.1, ease: "easeOut" }}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono z-10 transition-all duration-500 ${
            index === 0
              ? "border-primary bg-primary/10 text-primary shadow-[0_0_16px_rgba(14,165,233,0.25)]"
              : "border-zinc-800 bg-black text-zinc-500"
          }`}
        >
          {step.number}
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1.5">
        <h3 className="text-base font-semibold text-zinc-100 mb-2 leading-snug">
          {step.title}
        </h3>
        <p className="text-[13px] text-zinc-400 leading-[1.75]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <Section className="bg-zinc-950/30 py-24 border-t border-zinc-900">
      <Container>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl mb-16"
        >
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            From idea to production<br />in minutes.
          </h2>
          <p className="text-[13px] text-zinc-400 leading-relaxed">
            No ML background needed. No infrastructure to manage. Just describe what you need and ship.
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative max-w-xl">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute left-[19px] top-5 bottom-5 w-px bg-zinc-900"
          />
          <div className="space-y-0">
            {steps.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
