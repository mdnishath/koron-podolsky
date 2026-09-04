import type { Metadata } from "next";
import { ConfidentialityNote, Container, Disclaimer, Eyebrow, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { ResultsGrid } from "@/components/ui/content";
import { CtaSection, FaqSection, PageHero } from "@/components/sections/shared";
import { PracticeAreaList } from "@/components/sections/PracticeAreas";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { EMPLOYMENT_AREAS, EMPLOYMENT_FAQS, EMPLOYMENT_RESULTS, TESTIMONIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Employment Litigation Attorneys in Los Angeles",
  description:
    "Wrongful termination, discrimination, harassment and retaliation, wage and hour, and severance matters. Confidential consultations for employees across Los Angeles County.",
  alternates: { canonical: "/employment-law" },
};

export default function EmploymentLawPage() {
  return (
    <>
      <PageHero
        eyebrow="Employment litigation"
        title="What happens at work should not stay hidden."
        accentWord="hidden."
        lead="We represent employees against employers across Los Angeles County — in wrongful termination, discrimination, harassment and retaliation, wage and hour, and severance matters."
        crumbs={[{ label: "Home", href: "/" }, { label: "Employment litigation" }]}
        image="/img/partners-lobby.jpg"
        imagePosition="50% 0%"
      />

      <Section tone="ivory">
        <Container width="read">
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "clamp(22px, 3vw, 30px)" }}>
            <p className="kp-lead-copy">Most people who call us have never spoken to a lawyer before. They are not sure whether what happened to them was illegal, and they are worried about what asking will cost them.</p>
            <p className="kp-body-copy">You do not need to know the name of the claim. You need to describe what happened, in order, and let a lawyer tell you whether the law treats it as a violation. That is what a first conversation is for, and it does not commit you to anything.</p>
            <p className="kp-body-copy">California gives employees more protection than most states, and less time to use it than most people expect. Some claims begin with an administrative filing that runs in months rather than years. If you are weighing whether to ask, ask early — the answer costs nothing and the deadline does not wait.</p>
          </div>
          <div data-reveal data-reveal-delay={100} style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
            <ConfidentialityNote />
          </div>
        </Container>
      </Section>

      <Section tone="dark" id="areas">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="What we handle" title="Five kinds of employment matter." accentWord="Five kinds" wide lead="Start with the one closest to your situation. If none of them fits exactly, describe it in your own words and we will tell you which it is." />
          </div>
          <div className="kp-mt-lg">
            <PracticeAreaList areas={EMPLOYMENT_AREAS} />
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Representative results" title="Employment matters the firm has tried and resolved." accentWord="tried and resolved" wide />
          </div>
          <div className="kp-mt-md">
            <ResultsGrid results={EMPLOYMENT_RESULTS} columns={3} />
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
            <TestimonialCarousel items={TESTIMONIALS.filter((t) => !t.context.includes("Motor vehicle"))} />
          </div>
        </Container>
      </Section>

      <FaqSection title="The four questions we hear before anything else." accentWord="four questions" faqs={EMPLOYMENT_FAQS} />

      <CtaSection
        title="Tell us what happened at work."
        accentWord="what happened"
        lead="A guided assessment, about two minutes. Contact details are asked at the end, not the start, and nothing is filed or disclosed without your direction."
        href="/tell-us-about-your-case"
      />
    </>
  );
}
