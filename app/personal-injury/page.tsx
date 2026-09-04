import type { Metadata } from "next";
import { Container, Disclaimer, Eyebrow, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { ResultsGrid } from "@/components/ui/content";
import { CtaSection, FaqSection, PageHero } from "@/components/sections/shared";
import { PracticeAreaList } from "@/components/sections/PracticeAreas";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { INJURY_AREAS, INJURY_FAQS, INJURY_RESULTS, TESTIMONIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Personal Injury Attorneys in Los Angeles",
  description:
    "Vehicle collisions, premises liability, medical malpractice, product liability, and wrongful death. We take on insurance carriers and public entities across Los Angeles County.",
  alternates: { canonical: "/personal-injury" },
};

const URGENT = [
  { label: "Before you sign", body: "A release closes a claim for good. Read nothing under time pressure, and have anything the carrier sends you reviewed first." },
  { label: "Before you give a statement", body: "You are not required to give a recorded statement to the other side's insurer, and you may speak with a lawyer before you do." },
  { label: "Public entities", body: "Claims involving a city, county, or transit agency can carry far shorter deadlines than claims against a private party." },
];

export default function PersonalInjuryPage() {
  return (
    <>
      <PageHero
        eyebrow="Personal injury"
        title="When someone else's negligence changes everything."
        accentWord="negligence"
        lead="We take on insurance carriers, property owners, and public entities across Los Angeles County — in collisions, premises claims, product cases, and wrongful death."
        crumbs={[{ label: "Home", href: "/" }, { label: "Personal injury" }]}
        image="/img/partners-colonnade.jpg"
        imagePosition="50% 0%"
      />

      <Section tone="ivory">
        <Container width="read">
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 3vw, 30px)" }}>
            <p className="kp-lead-copy">A serious injury arrives with adjusters, recorded statements, medical bills, and deadlines all at once — usually while you are least able to deal with any of it.</p>
            <p className="kp-body-copy">The other side begins working on your claim the day it is reported. An adjuster&apos;s first call is not a courtesy; it is the start of an evaluation. What is said in the first week routinely shapes what the claim is worth two years later.</p>
            <p className="kp-body-copy">Our part is to take that weight off you: preserve the evidence, deal with the carrier, build the medical record properly, and prepare the case as though it will be tried. Your part is to get well and to keep us informed.</p>
          </div>
          <div data-reveal data-reveal-delay={100} className="kp-cells kp-cells--3" style={{ marginTop: "clamp(32px, 4vw, 44px)" }}>
            {URGENT.map((u) => (
              <div key={u.label} className="kp-cell">
                <span className="kp-cell__label">{u.label}</span>
                <p className="kp-cell__body">{u.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark" id="areas">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="What we handle" title="Five kinds of injury matter." accentWord="Five kinds" wide lead="Start with the one closest to what happened. If you are not sure how to describe it, describe it plainly and we will place it." />
          </div>
          <div className="kp-mt-lg">
            <PracticeAreaList areas={INJURY_AREAS} />
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Representative results" title="Injury matters where causation was contested." accentWord="causation" wide lead="Both of these turned on the same argument: that the collision did not cause the injury. Documentation is what answered it." />
          </div>
          <div className="kp-mt-md">
            <ResultsGrid results={INJURY_RESULTS} />
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

      <Section tone="dark" spacing="sm">
        <Container width="read">
          <div data-reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 26 }}>
            <Eyebrow>Client experiences</Eyebrow>
            <TestimonialCarousel items={[TESTIMONIALS[1], TESTIMONIALS[2]]} />
          </div>
        </Container>
      </Section>

      <FaqSection title="What people ask in the first phone call." accentWord="first phone call" faqs={INJURY_FAQS} />

      <CtaSection title="Speak with an attorney today." accentWord="today." lead="If your matter is time-sensitive, calling is faster than waiting. Otherwise the guided assessment takes about two minutes." href="/tell-us-about-your-case" />
    </>
  );
}
