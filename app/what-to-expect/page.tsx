import type { Metadata } from "next";
import { Container, Disclaimer, Section, SectionHeading } from "@/components/ui/primitives";
import { CtaSection, FaqSection, PageHero } from "@/components/sections/shared";
import { ProcessSwitch } from "@/components/sections/ProcessSwitch";
import { EXPECT_FAQS } from "@/lib/content";

export const metadata: Metadata = {
  title: "What to Expect",
  description: "A plain walkthrough of both tracks, from the first call to resolution — including the parts most firms leave out.",
  alternates: { canonical: "/what-to-expect" },
};

const TRUTHS = [
  { title: "Litigation is slow, and the slow parts are normal", body: "Long stretches pass with nothing visible happening — waiting on records, on a court date, on the other side. Silence usually means the process is working, not that your matter has been forgotten." },
  { title: "Nobody can value your case at the start", body: "Value depends on evidence that does not exist yet. Any number quoted in a first call is a guess, and a firm willing to guess early is telling you something about how it works." },
  { title: "Most cases resolve before trial — and trial readiness is why", body: "Preparing a case properly is what makes the other side take it seriously. That is not a contradiction; it is the mechanism." },
];

export default function WhatToExpectPage() {
  return (
    <>
      <PageHero
        eyebrow="What to expect"
        title="Nobody explains how long any of this takes. We will."
        accentWord="how long"
        lead="A plain walkthrough of both tracks, from the first call to resolution — including the parts most firms leave out."
        crumbs={[{ label: "Home", href: "/" }, { label: "What to expect" }]}
      />

      <Section tone="ivory">
        <Container>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 34px)" }}>
            <SectionHeading eyebrow="The walkthrough" title="Choose the track that matches your matter." accentWord="your matter" wide lead="The five phases are the same in both. What differs is what happens inside them, and how long each one tends to run." />
            <ProcessSwitch />
          </div>
          <div style={{ maxWidth: "70ch", marginTop: "clamp(26px, 3vw, 36px)" }}>
            <Disclaimer>Timelines describe how matters of this kind commonly run. They are not a promise about your matter, and no outcome is guaranteed. Your own schedule depends on the facts, the venue, and the other side.</Disclaimer>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Said plainly" title="Three things most firms will not tell you." accentWord="will not tell you" wide />
          </div>
          <div className="kp-cells kp-cells--3 kp-mt-md">
            {TRUTHS.map((t, i) => (
              <div key={t.title} className="kp-cell" data-reveal data-reveal-delay={i * 90}>
                <span className="kp-cell__label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="kp-cell__title">{t.title}</h3>
                <p className="kp-cell__body">{t.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FaqSection eyebrow="Working with us" title="What we ask of you, and what you can ask of us." accentWord="of us" faqs={EXPECT_FAQS} />

      <CtaSection title="Start with a conversation, not a commitment." accentWord="a conversation" lead="About two minutes to tell us what happened. Contact details are asked at the end, not the start." href="/tell-us-about-your-case" />
    </>
  );
}
