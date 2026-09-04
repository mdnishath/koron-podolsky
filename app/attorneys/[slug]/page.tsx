import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, Button, Container, Disclaimer, Eyebrow, Figure, GoldRule, Monogram, PhoneLink, Section, SectionHeading, SplitPanel, TextLink } from "@/components/ui/primitives";
import { ResultsGrid } from "@/components/ui/content";
import { CtaSection } from "@/components/sections/shared";
import { ATTORNEYS, getAttorney } from "@/lib/content";

export function generateStaticParams() {
  return ATTORNEYS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAttorney(slug);
  if (!a) return {};
  return {
    title: `${a.name}, Partner`,
    description: a.line,
    alternates: { canonical: `/attorneys/${a.slug}` },
    openGraph: { images: [{ url: a.portrait, width: 800, height: 1000 }] },
  };
}

export default async function AttorneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAttorney(slug);
  if (!a) notFound();
  const other = ATTORNEYS.find((x) => x.slug !== a.slug)!;

  return (
    <>
      <header className="kp-bio-hero" data-kp-tone="deep">
        <Monogram tone="gold" align="right" />
        <div className="kp-hero__glow" aria-hidden="true" />
        <Container>
          <div className="kp-bio-grid">
            <div data-reveal data-reveal-kind="image">
              <Figure src={a.portrait} alt={a.portraitAlt} ratio="portrait" frame priority sizes="(min-width: 940px) 40vw, 100vw" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "clamp(18px, 2.4vw, 26px)" }} data-reveal>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our attorneys", href: "/attorneys" }, { label: a.name }]} />
              <Eyebrow secondary="Trial attorney">{a.role}</Eyebrow>
              <h1 className="kp-bio-name">{a.name}</h1>
              <GoldRule />
              <p className="kp-bio-lead">{a.line}</p>
              <div className="kp-inline-actions" style={{ gap: 22, marginTop: 6 }}>
                <Button variant="plate" size="lg" href="/tell-us-about-your-case">
                  Request a Consultation
                </Button>
                <PhoneLink size="lg" tone="accent" />
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Section tone="ivory">
        <Container>
          <SplitPanel ratio="major" alignTop>
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <SectionHeading eyebrow="In practice" title={a.slug === "boris-koron" ? "Cases are built long before anyone stands up in court." : "Range is an advantage when a case refuses to stay in one lane."} accentWord={a.slug === "boris-koron" ? "long before" : "an advantage"} wide />
              {a.bio.map((p) => (
                <p key={p.slice(0, 30)} className="kp-body-copy" style={{ lineHeight: 1.78 }}>
                  {p}
                </p>
              ))}
              <div className="kp-longform" style={{ marginTop: 8 }}>
                <blockquote>
                  {a.personal}
                  <footer style={{ marginTop: 12, fontFamily: "var(--kp-font-sans)", fontSize: "var(--kp-xs)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--kp-text-faint)" }}>— {a.name}</footer>
                </blockquote>
              </div>
            </div>
            <div data-reveal data-reveal-delay={90} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Eyebrow>Credentials</Eyebrow>
                <ul className="kp-creds">
                  {a.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Eyebrow>Admissions and memberships</Eyebrow>
                <ul className="kp-creds">
                  {a.admissions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="kp-office-card" style={{ background: "var(--kp-surface)" }}>
                <Eyebrow>Also at the firm</Eyebrow>
                <p style={{ margin: 0, fontFamily: "var(--kp-font-display)", fontSize: "1.35rem", color: "var(--kp-heading)" }}>{other.name}</p>
                <p style={{ margin: 0, fontSize: "var(--kp-sm)", color: "var(--kp-text-muted)" }}>{other.line}</p>
                <TextLink href={`/attorneys/${other.slug}`}>Read {other.short}&apos;s biography</TextLink>
              </div>
            </div>
          </SplitPanel>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Practice focus" title={`What ${a.slug === "boris-koron" ? "he" : "he"} handles, on both tracks.`} accentWord="both tracks" wide />
          </div>
          <div className="kp-cells kp-cells--2 kp-mt-md" data-reveal data-reveal-delay={100}>
            <div className="kp-cell">
              <span className="kp-cell__label">Employment litigation</span>
              <ul className="kp-focus__list">
                {a.focus.employment.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <TextLink href="/employment-law">Employment litigation</TextLink>
            </div>
            <div className="kp-cell">
              <span className="kp-cell__label">Personal injury</span>
              <ul className="kp-focus__list">
                {a.focus.injury.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <TextLink href="/personal-injury">Personal injury</TextLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Related results" title="Matters from the firm's published list." accentWord="published list" wide />
          </div>
          <div className="kp-mt-md">
            <ResultsGrid results={a.results} />
          </div>
          <div className="kp-results-foot">
            <div style={{ maxWidth: "62ch" }}>
              <Disclaimer kind="results" />
            </div>
            <TextLink href="/results" persistent>
              All representative results
            </TextLink>
          </div>
        </Container>
      </Section>

      <CtaSection
        title={`Speak with ${a.name}.`}
        accentWord={`${a.name}.`}
        lead="Tell us what happened. The first conversation is with an attorney, and it costs nothing."
        href="/tell-us-about-your-case"
        secondary={
          <Link href="/attorneys" className="kp-link">
            <span>Both partners</span>
          </Link>
        }
      />
    </>
  );
}
