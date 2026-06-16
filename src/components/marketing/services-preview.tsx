import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

const services = [
  {
    tag: "Customer Support",
    title: "Never leave a ticket unanswered.",
    description:
      "Deploy a support agent that resolves Tier-1 tickets, escalates edge cases, and updates your CRM — 24/7, across every channel.",
    bullets: ["Live chat & email triage", "CRM sync (Salesforce, HubSpot)", "Escalation routing"],
    hoverBorder: "hover:border-primary",
  },
  {
    tag: "Research",
    title: "Insight at the speed of thought.",
    description:
      "Agents that browse, synthesize, and summarize information from the web, internal docs, and databases into structured reports.",
    bullets: ["Web & document search", "Structured report generation", "Slack / email delivery"],
    hoverBorder: "hover:border-accent",
  },
  {
    tag: "Workflow Automation",
    title: "Automate the repetitive. Focus on the strategic.",
    description:
      "Connect agents to your existing tools and let them handle data entry, approvals, notifications, and reporting autonomously.",
    bullets: ["Cross-tool orchestration", "Event-triggered execution", "Audit-ready logs"],
    hoverBorder: "hover:border-primary",
  },
];

export function ServicesPreview() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Services
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            One platform. Every use case.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Pre-built agent templates for the workflows that matter most,
            fully customizable for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card
              key={s.tag}
              className={`bg-card border-border flex flex-col transition-all duration-300 hover:-translate-y-1 ${s.hoverBorder}`}
            >
              <CardHeader>
                <Badge variant="outline" className="w-fit text-xs border-border text-muted-foreground mb-2">
                  {s.tag}
                </Badge>
                <CardTitle className="text-xl font-bold text-foreground leading-snug">
                  {s.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-border flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-border bg-transparent text-foreground hover:bg-card hover:border-primary transition-colors"
          >
            <Link href="/services">Explore all services →</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
