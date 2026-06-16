"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    quote:
      "We replaced three internal tools with a single Aether agent. Our support resolution time dropped 60% in the first month — with no added headcount.",
    name: "Marcus Vance",
    role: "VP of Customer Experience",
    company: "Apex Supply Chain",
    initials: "MV",
  },
  {
    quote:
      "The audit logs and role-based access made it trivial to get security sign-off. We were in production within two weeks of initial integration.",
    name: "Sarah Jenkins",
    role: "Director of Automation",
    company: "Vanguard Capital",
    initials: "SJ",
  },
  {
    quote:
      "Aether's research agent saves our analyst team 20+ hours a week. It synthesizes data across 12 sources into a single structured briefing every morning.",
    name: "Daniel Cho",
    role: "Head of Operations",
    company: "AeroSpace Dynamics",
    initials: "DC",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

export function Testimonials() {
  return (
    <Section className="bg-black py-24 border-t border-zinc-900">
      <Container>
        <div className="max-w-2xl mb-16 text-left">
          <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-3">
            Social proof
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Trusted by operators who ship.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={cardVariants} className="flex">
              <Card className="bg-zinc-950/40 border border-zinc-800/70 flex flex-col p-7 rounded-xl hover:border-zinc-700 transition-all duration-300 w-full">
                <CardContent className="p-0 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <span className="text-3xl text-zinc-800 leading-none font-serif select-none block mb-3">
                      &ldquo;
                    </span>
                    <p className="text-[13px] text-zinc-300 leading-[1.75]">
                      {t.quote}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <Separator className="bg-zinc-900" />
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 font-mono">
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-zinc-200 font-mono">{t.name}</p>
                        <p className="text-[11px] text-zinc-500 font-mono">
                          {t.role} · {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
