import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

const testimonials = [
  {
    quote:
      "We replaced three internal tools with a single Aether agent. Our support resolution time dropped by 60% in the first month.",
    name: "Maya Patel",
    role: "VP of Engineering",
    company: "Cloudscale",
    initials: "MP",
  },
  {
    quote:
      "The audit logs and RBAC made it trivial to get security sign-off. We were in production in under two weeks.",
    name: "James Okonkwo",
    role: "CTO",
    company: "Synthetix",
    initials: "JO",
  },
  {
    quote:
      "Aether's research agent saves our analyst team 20+ hours a week. It just works, and the output quality is exceptional.",
    name: "Elena Marchetti",
    role: "Head of Strategy",
    company: "Agentic Labs",
    initials: "EM",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-card/20">
      <Container>
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Social proof
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Trusted by builders who ship.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-card border-border flex flex-col">
              <CardContent className="pt-8 flex flex-col flex-1 gap-4">
                <span className="text-4xl text-border leading-none font-serif select-none">
                  &ldquo;
                </span>
                <p className="text-sm text-foreground leading-relaxed flex-1 -mt-2">
                  {t.quote}
                </p>
                <Separator className="bg-border" />
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
