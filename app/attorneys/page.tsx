import type { Metadata } from "next";
import { Button, Container, Eyebrow, Figure, GoldRule, PhoneLink, Section, SectionHeading, SplitPanel, cx } from "@/components/ui/primitives";
import { CtaSection, PageHero } from "@/components/sections/shared";
import { ATTORNEYS } from "@/lib/content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Attorneys",
  description: "Two partners, both of them trial lawyers. The attorney you speak with is the attorney who handles your matter.",
  alternates: { canonical: "/attorneys" },
};

export default function AttorneysPage() {
  return (
    <>
      <PageHero
        eyebrow="Our attorneys"
        title="Two partners. Both of them trial lawyers."
        accentWord="trial lawyers"
        lead="The attorney you speak with is the attorney who handles your matter. That is the whole reason the firm is this size."
        crumbs={[{ label: "Home", href: "/" }, { label: "Our attorneys" }]}
        image="/img/partners-hero.jpg"
        imagePosition="68% 20%"
      />

      <Section tone="ivory">
        <Container>
          {ATTORNEYS.map((a, i) => (
            <div
              key={a.slug}
              id={a.slug}
              className={cx("kp-partner", i % 2 === 1 && "kp-partner--flip")}
              data-reveal
              style={i > 0 ? { marginTop: "clamp(48px, 7vw, 96px)", paddingTop: "clamp(40px, 5vw, 64px)", borderTop: "1px solid var(--kp-hairline)" } : undefined}
            >
              <div data-reveal data-reveal-kind="image">
                <Figure src={a.portrait} alt={a.portraitAlt} ratio="portrait" frame sizes="(min-width: 940px) 40vw, 100vw" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start" }}>
                <Eyebrow>{a.role}</Eyebrow>
                <h2 className="kp-partner__name">{a.name}</h2>
                <GoldRule />
                <p className="kp-partner__line">{a.line}</p>
                <ul className="kp-partner__creds">
                  {a.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <div className="kp-inline-actions" style={{ gap: 20 }}>
                  <Button variant="secondary" href={`/attorneys/${a.slug}`} withArrow>
                    Read the full bio
                  </Button>
                  <Button variant="ghost" href="/tell-us-about-your-case">
                    Speak with {a.short}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Section tone="dark" id="our-firm">
        <Container>
          <SplitPanel ratio="major" alignTop>
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <SectionHeading eyebrow="Our firm" title="Two partners is a decision, not a limitation." accentWord="a decision" wide />
              <p className="kp-body-copy">Larger firms distribute a case across associates, paralegals, and case managers. It is an efficient way to run a business and a poor way to know a client. We built this firm so that the person who hears your account at the start is the person who argues it at the end.</p>
              <p className="kp-body-copy">That imposes a discipline: we take cases selectively, and we say so early when a matter is not one for us. A deliberately small caseload is what makes partner attention possible rather than promised.</p>
              <p className="kp-body-copy">We practise on both sides of the same problem — employees against employers, and injured people against insurance carriers and public entities. Both are cases where one party has resources and the other has an account of what happened. Our work is to make the second one count.</p>
            </div>
            <div data-reveal data-reveal-delay={90} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="kp-office-card">
                <Eyebrow>Office</Eyebrow>
                <p style={{ margin: 0, fontSize: "var(--kp-body)", lineHeight: 1.7, color: "var(--kp-text)" }}>
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </p>
                <p style={{ margin: 0, fontSize: "var(--kp-sm)", lineHeight: 1.6, color: "var(--kp-text-faint)" }}>{SITE.serving}</p>
                <PhoneLink tone="accent" />
              </div>
              <div className="kp-office-card">
                <Eyebrow>The firm</Eyebrow>
                <ul className="kp-focus__list">
                  <li>Founded by Boris Koron after eleven years in personal injury practice</li>
                  <li>Two partners, both admitted to practice in California</li>
                  <li>Employment litigation and personal injury, tried in Los Angeles County courts</li>
                  <li>Consultations are free, confidential, and taken by a partner</li>
                </ul>
              </div>
            </div>
          </SplitPanel>
        </Container>
      </Section>

      <CtaSection title="Speak with a partner, not an intake desk." accentWord="a partner" lead="Tell us what happened. The first conversation is with an attorney, and it costs nothing." href="/tell-us-about-your-case" />
    </>
  );
}
