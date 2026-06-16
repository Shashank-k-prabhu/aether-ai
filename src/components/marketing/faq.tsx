"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

const faqs = [
  {
    q: "How long does it take to deploy an agent?",
    a: "Most teams go from zero to production in under 48 hours. We provide pre-built templates for common use cases, and our onboarding team helps with custom integrations.",
  },
  {
    q: "Do I need ML expertise to use Aether?",
    a: "No. Aether is designed for engineering teams, not ML researchers. You define agent goals in plain language or via our API — we handle the model layer.",
  },
  {
    q: "How does Aether handle security and compliance?",
    a: "Aether is SOC 2 Type II certified. All agent decisions are logged, data is encrypted at rest and in transit, and you get fine-grained RBAC for every resource.",
  },
  {
    q: "Can agents access our internal databases and tools?",
    a: "Yes. Aether has native connectors for Postgres, MySQL, Salesforce, HubSpot, Slack, GitHub, Jira, and 40+ other tools. Custom connectors are available via REST API.",
  },
  {
    q: "What happens if an agent makes a mistake?",
    a: "Every action is logged with a full audit trail. You can set human-in-the-loop checkpoints for high-stakes tasks, and agents can be rolled back or paused at any time.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes — start free with up to 3 agents and 1,000 task runs per month. Upgrade to a team or enterprise plan as you scale.",
  },
];

export function Faq() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Common questions.
          </h2>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl divide-y divide-border">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-0 py-1"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-primary hover:no-underline transition-colors text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
