import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";

const companies = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "GitHub",
  "Anthropic",
  "Datadog",
];

export function TrustedBy() {
  return (
    <section className="border-y border-border py-12 bg-card/30">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by engineering teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {companies.map((name) => (
            <Badge
              key={name}
              variant="outline"
              className="border-border text-muted-foreground/60 hover:text-muted-foreground hover:border-muted-foreground/40 transition-colors text-xs font-medium px-4 py-1.5 cursor-default"
            >
              {name}
            </Badge>
          ))}
        </div>
      </Container>
    </section>
  );
}
