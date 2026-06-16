import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

const steps = [
  {
    number: "01",
    title: "Define your agent",
    description:
      "Describe what the agent should do in plain language. Set goals, constraints, memory, and the tools it can access.",
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
      "Watch agent decisions in real time. Adjust behavior via the dashboard or API. Agents improve with every run.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-card/20">
      <Container>
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            From idea to production in minutes.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            No ML background needed. No infrastructure to manage. Just describe
            what you need and ship.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative max-w-2xl">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute left-[19px] top-0 bottom-0 w-px bg-border"
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex gap-8 pb-12 last:pb-0">
                {/* Node */}
                <div className="relative flex-shrink-0 flex items-start pt-0.5">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 transition-all duration-500
                      ${i === 0
                        ? "border-accent bg-accent/10 text-accent shadow-[0_0_12px_rgba(103,232,249,0.3)]"
                        : "border-border bg-background text-muted-foreground"
                      }`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
