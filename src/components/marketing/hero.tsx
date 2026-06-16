"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { 
  Mail, 
  Bot, 
  Search, 
  GitBranch, 
  Database, 
  CheckCircle2, 
  Sparkles, 
  Terminal
} from "lucide-react";

const steps = [
  { 
    id: 1, 
    name: "Customer Email", 
    desc: "Inbound ticket parsed", 
    icon: Mail, 
    color: "from-blue-500 to-sky-400",
    logs: [
      "INFO  [00:01] Inbound SMTP connection from mail-server.com",
      "INFO  [00:01] Payload size: 4.2kb, Type: text/html",
      "SUCCESS [00:02] Query parsed: 'Can I get a refund for transaction TX-920?'"
    ]
  },
  { 
    id: 2, 
    name: "Support Agent", 
    desc: "Sentiment & intent classified", 
    icon: Bot, 
    color: "from-sky-500 to-cyan-400",
    logs: [
      "DEBUG [00:03] Loading Classifier model (v2.4.1)...",
      "INFO  [00:03] Intent: Transaction_Refund (Confidence: 99.4%)",
      "INFO  [00:04] Sentiment: Neutral-Negative (Urgency score: 8/10)"
    ]
  },
  { 
    id: 3, 
    name: "Research Agent", 
    desc: "Stripe & DB audit completed", 
    icon: Search, 
    color: "from-cyan-500 to-teal-400",
    logs: [
      "INFO  [00:05] Querying database for user context...",
      "INFO  [00:06] Found transaction TX-920 in Stripe: $149.00 (Status: Settled)",
      "SUCCESS [00:07] Validation passed: Refund window active (14 days left)"
    ]
  },
  { 
    id: 4, 
    name: "Workflow Agent", 
    desc: "Executing API resolution", 
    icon: GitBranch, 
    color: "from-teal-500 to-emerald-400",
    logs: [
      "WARN  [00:08] Requesting OAuth token with billing scope...",
      "INFO  [00:08] Calling Stripe API endpoint: POST /v1/refunds...",
      "SUCCESS [00:09] API Response: Refund successful (ID: re_93h28d)"
    ]
  },
  { 
    id: 5, 
    name: "CRM Updated", 
    desc: "HubSpot synchronized", 
    icon: Database, 
    color: "from-emerald-500 to-green-400",
    logs: [
      "INFO  [00:10] Connecting to HubSpot API gateway...",
      "INFO  [00:11] Syncing ticket status -> RESOLVED",
      "SUCCESS [00:11] Logged: 'Refund re_93h28d processed automatically'"
    ]
  },
  { 
    id: 6, 
    name: "Resolved", 
    desc: "Closing notification sent", 
    icon: CheckCircle2, 
    color: "from-green-500 to-emerald-500",
    logs: [
      "INFO  [00:12] Constructing outbound response template...",
      "INFO  [00:12] Dispatching transactional email via SES...",
      "SUCCESS [00:13] Conversation closed. Total runtime: 12.4s"
    ]
  },
];

export function Hero() {
  const [activeStep, setActiveStep] = useState(0);

  // Rotate active step for workflow animation
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-black text-white">
      {/* Premium background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle blue/sky glow */}
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Headline & Copy */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-3.5 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-mono font-medium text-zinc-300 tracking-wider uppercase">
                Enterprise AI Infrastructure
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              AI Agents that <br />
              <span className="bg-gradient-to-r from-primary via-accent to-emerald-400 bg-clip-text text-transparent">
                work while you sleep.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed">
              Aether AI coordinates autonomous work pipelines. Chain actions, query secure databases, process payments, and sync systems—automatically monitored in real time.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
              <Button
                asChild
                className="h-10 px-6 bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg font-medium text-xs transition-all shadow-[0_0_20px_rgba(14,165,233,0.15)]"
              >
                <Link href="/register">Start building free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-10 px-6 border-zinc-800 bg-zinc-950/30 text-zinc-300 hover:bg-zinc-900 rounded-lg font-medium text-xs transition-all"
              >
                <Link href="/services">See active agents →</Link>
              </Button>
            </div>
          </div>

          {/* Right Side: Re-architected Workflow UI */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-xl border border-zinc-900 bg-[#07090e]/80 p-5 backdrop-blur-xl shadow-2xl overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 ml-2">aether-runtime://session-09a2f</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400">ENGINE ONLINE</span>
                </div>
              </div>

              {/* Side-by-Side Pipeline Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch min-h-[380px]">
                
                {/* Pipeline Steps (Left Column) */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-4 relative pl-4">
                  
                  {steps.map((step, idx) => {
                    const StepIcon = step.icon;
                    const isActive = activeStep === idx;
                    const isCompleted = activeStep > idx;

                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(idx)}
                        className="group flex items-start gap-3 text-left w-full focus:outline-none relative"
                      >
                        {/* Bullet Circle & Connective Line Segment Container */}
                        <div className="relative flex flex-col items-center justify-center w-3 h-5 shrink-0">
                          {/* Node Bullet Circle */}
                          <div 
                            className={`h-2.5 w-2.5 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                              isActive 
                                ? "bg-primary border-primary shadow-[0_0_8px_var(--color-primary)] scale-110" 
                                : isCompleted 
                                ? "bg-zinc-800 border-zinc-700" 
                                : "bg-black border-zinc-800"
                            }`}
                          >
                            {isCompleted && <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                          </div>

                          {/* Line Connector Segment (Centered dynamically via translate-x) */}
                          {idx < steps.length - 1 && (
                            <div className="absolute top-3.5 bottom-[-28px] left-1/2 -translate-x-1/2 w-[1px] bg-zinc-900 pointer-events-none">
                              <motion.div 
                                className="w-full bg-primary origin-top shadow-[0_0_8px_var(--color-primary)]"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: isCompleted ? 1 : isActive ? 1 : 0 }}
                                transition={{ duration: isActive ? 3.5 : 0.2, ease: "linear" }}
                                style={{ height: "100%" }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Node Content */}
                        <div className="flex items-center gap-2.5 pl-1">
                          <div className={`p-1.5 rounded-md border transition-all duration-300 ${
                            isActive 
                              ? "bg-zinc-900 border-zinc-700 text-primary" 
                              : "bg-zinc-950 border-zinc-900/60 text-zinc-650"
                          }`}>
                            <StepIcon className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className={`text-xs font-semibold font-mono tracking-tight transition-colors duration-200 ${
                              isActive ? "text-zinc-100" : "text-zinc-400 group-hover:text-zinc-350"
                            }`}>
                              {step.name}
                            </p>
                            <p className={`text-[9px] font-mono transition-colors duration-200 ${
                              isActive ? "text-zinc-400" : "text-zinc-600 group-hover:text-zinc-550"
                            }`}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Console Log Panel (Right Column) */}
                <div className="md:col-span-7 flex flex-col bg-zinc-950/90 border border-zinc-900 rounded-lg overflow-hidden">
                  
                  {/* Console Header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-900 bg-zinc-950">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="h-3 w-3 text-zinc-500" />
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Console Logs</span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500">{steps[activeStep].name}</span>
                  </div>

                  {/* Console Body */}
                  <div className="flex-1 p-3.5 font-mono text-[10px] text-zinc-400 leading-normal overflow-y-auto space-y-2 select-text">
                    <div className="text-zinc-500 text-[9px] border-b border-zinc-900/50 pb-1.5 mb-2 flex items-center justify-between">
                      <span>RUNNING TARGET: {steps[activeStep].name.toUpperCase()}</span>
                      <span className="text-emerald-400 font-semibold">[OK]</span>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        {steps[activeStep].logs.map((log, lIdx) => {
                          const isSuccess = log.startsWith("SUCCESS");
                          const isError = log.startsWith("ERROR") || log.startsWith("WARN");
                          
                          return (
                            <div key={lIdx} className="whitespace-pre-wrap">
                              <span className={
                                isSuccess ? "text-emerald-400" : isError ? "text-amber-400" : "text-zinc-500"
                              }>
                                {log.split(" ")[0]}
                              </span>{" "}
                              <span className="text-zinc-400">{log.split(" ").slice(1, 3).join(" ")}</span>{" "}
                              <span className="text-zinc-300">{log.split(" ").slice(3).join(" ")}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>

                    {/* Faux trailing caret */}
                    <div className="flex items-center gap-1 text-[9px] pt-1">
                      <span className="text-primary animate-pulse">❯</span>
                      <motion.span 
                        animate={{ opacity: [1, 0, 1] }} 
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-1.5 h-3 bg-zinc-700"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
