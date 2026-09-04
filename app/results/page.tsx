import type { Metadata } from "next";
import { Container, Disclaimer, Section, SectionHeading, SplitPanel } from "@/components/ui/primitives";
import { StatBlock } from "@/components/ui/content";
import { CtaSection, PageHero } from "@/components/sections/shared";
import { ResultsList } from "@/components/sections/ResultsList";
import { FIGURES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Representative Results",
  description: "The complete list of verdicts and settlements the firm publishes, stated plainly. No rounding, no totals, no adjectives doing persuasion work.",
  alternates: { canonical: "/results" },
};

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Representative results"
        title="Verdicts and settlements, stated plainly."
        accentWord="plainly."
        lead="A complete list of the matters the firm publishes. No rounding, no totals, no adjectives doing persuasion work."
        crumbs={[{ label: "Home", href: "/" }, { label: "Representative results" }]}
      />

      <Section tone="ivory">
        <Container>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div style={{ maxWidth: "70ch" }}>
              <Disclaimer kind="results" variant="boxed" />
            </div>
            <ResultsList />
          </div>
          <div data-reveal style={{ marginTop: "clamp(32px, 4vw, 48px)", paddingTop: 26, borderTop: "1px solid var(--kp-hairline-strong)", maxWidth: "74ch" }}>
            <p style={{ margin: 0, fontSize: "var(--kp-sm)", lineHeight: 1.7, color: "var(--kp-text-muted)", textWrap: "pretty" }}>
              This is the firm&apos;s complete published list. Results are described exactly as reported and are not extended, rounded, or aggregated into a total. Each matter turned on its own facts, its own evidence, and its own venue.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <SplitPanel ratio="major" alignTop>
            <div data-reveal>
              <SectionHeading
                eyebrow="How to read these"
                title="What a past result does and does not tell you."
                accentWord="does not"
                wide
                lead="A verdict shows what a jury did on one set of facts. A settlement shows what two sides agreed was reasonable to end a dispute. Neither predicts an outcome in a different matter, and no lawyer can promise one."
              />
            </div>
            <div data-reveal data-reveal-delay={90} className="kp-cells kp-cells--2" style={{ background: "var(--kp-hairline)" }}>
              {FIGURES.map((f) => (
                <div key={f.label} className="kp-cell">
                  <StatBlock value={f.value} label={f.label} />
                </div>
              ))}
            </div>
          </SplitPanel>
        </Container>
      </Section>

      <CtaSection title="Your case deserves to be heard." accentWord="heard." lead="Tell us what happened. The first conversation is with an attorney, and it costs nothing." href="/tell-us-about-your-case" />
    </>
  );
}
