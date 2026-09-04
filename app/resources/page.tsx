import type { Metadata } from "next";
import { Container, Disclaimer, Section, SectionHeading } from "@/components/ui/primitives";
import { ArticleCard } from "@/components/ui/content";
import { CtaSection, PageHero } from "@/components/sections/shared";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Plain answers to the first questions people ask us, written for the week before you call a lawyer.",
  alternates: { canonical: "/resources" },
};

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Plain answers to the first questions people ask us." accentWord="Plain answers" lead="Short, attorney-reviewed explainers for the week before you call a lawyer. General information about California law, not advice about your matter." crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]} />

      <Section tone="white">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Explainers" title="Start with the one that matches your week." accentWord="your week" wide />
          </div>
          <div className="kp-grid kp-grid--3 kp-mt-lg">
            {ARTICLES.map((a, i) => (
              <div key={a.slug} data-reveal data-reveal-delay={i * 80} style={{ display: "flex" }}>
                <ArticleCard category={a.category} date={fmt(a.date)} title={a.title} href={`/resources/${a.slug}`} excerpt={a.excerpt} readTime={a.readTime} />
              </div>
            ))}
          </div>
          <div className="kp-mt-md" style={{ maxWidth: "70ch" }}>
            <Disclaimer kind="advertising" />
          </div>
        </Container>
      </Section>

      <CtaSection title="Reading is a good start. Asking is better." accentWord="Asking" lead="A guided assessment, about two minutes. Contact details are asked at the end, not the start." href="/tell-us-about-your-case" />
    </>
  );
}
