"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Container } from "@/components/shared/container";

const companies = [
  "AeroSpace Dynamics",
  "Vanguard Capital",
  "Apex Supply Chain",
  "Crest Life Sciences",
  "Sentinel Cyber",
  "Core Systems",
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 0.35, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function TrustedBy() {
  return (
    <section className="border-y border-zinc-900 py-14 bg-black">
      <Container>
        <p className="text-center text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-10">
          Powering critical workflows at scale
        </p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-14 gap-y-7 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {companies.map((name) => (
            <motion.div
              key={name}
              variants={itemVariants}
              whileHover={{ opacity: 0.85, scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="text-sm md:text-[15px] font-semibold font-mono tracking-tight text-zinc-100 cursor-default select-none"
            >
              {name.toUpperCase()}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
