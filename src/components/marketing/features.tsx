import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

const features = [
  {
    icon: "⬡",
    title: "Autonomous Execution",
    description:
      "Agents run multi-step tasks end-to-end without human intervention — from triggering workflows to writing and sending reports.",
  },
  {
    icon: "⟳",
    title: "Real-Time Adaptation",
    description:
      "Continuously monitors outputs and adjusts strategy mid-task. If something breaks, the agent self-recovers.",
  },
  {
    icon: "⊞",
    title: "Enterprise Integrations",
    description:
      "Native connectors for Slack, GitHub, Jira, Salesforce, Postgres, and 40+ enterprise tools out of the box.",
  },
  {
    icon: "⛨",
    title: "Audit-Ready Logging",
    description:
      "Every agent decision is logged, timestamped, and exportable. SOC 2 compliant with role-based access control.",
  },
  {
    icon: "◈",
    title: "Custom Agent Builder",
    description:
      "Define agent goals, constraints, and memory in plain language or via API. No ML expertise required.",
  },
  {
    icon: "⟁",
    title: "Multi-Agent Orchestration",
    description:
      "Compose fleets of specialized agents that collaborate, delegate, and hand off tasks across your organization.",
  },
];

export function Features() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Platform
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Built for teams that move fast.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Everything you need to deploy production-grade AI agents — without
            managing infrastructure or writing model code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="rounded-none border-0 bg-card hover:-translate-y-1 hover:bg-[#0D1117] transition-all duration-300 cursor-default"
            >
              <CardHeader className="pb-2">
                <span className="text-2xl text-primary mb-2 block">{feature.icon}</span>
                <CardTitle className="text-base font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
