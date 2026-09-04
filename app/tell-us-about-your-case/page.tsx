import type { Metadata } from "next";
import { Container, Eyebrow, PhoneLink, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/shared";
import { Assessment } from "@/components/intake/Assessment";

export const metadata: Metadata = {
  title: "Tell Us About Your Case",
  description: "Four short steps. You will see what the law says about situations like yours, and what the firm has handled, before we ask how to reach you.",
  alternates: { canonical: "/tell-us-about-your-case" },
};

export default function TellUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tell us about your case"
        title="Start with what happened."
        accentWord="happened."
        lead="Four short steps. You will see what the law says about situations like yours, and what the firm has handled, before we ask how to reach you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Tell us about your case" }]}
      />

      <Section tone="dark" id="assessment">
        <Container width="tight">
          <div data-reveal style={{ padding: "clamp(22px, 3.5vw, 52px)", border: "1px solid var(--kp-hairline)", background: "var(--kp-bg-raised)" }}>
            <Assessment variant="page" />
          </div>
        </Container>
      </Section>

      <Section tone="ivory" spacing="sm">
        <Container width="tight">
          <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: "52ch" }}>
              <Eyebrow>Prefer to talk</Eyebrow>
              <p style={{ margin: 0, fontFamily: "var(--kp-font-display)", fontWeight: 400, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--kp-heading)", textWrap: "balance" }}>Some things are easier said out loud.</p>
              <p className="kp-body-copy" style={{ lineHeight: 1.65 }}>Call the office and ask for either partner. If we are in court, leave a number and a time that suits you.</p>
            </div>
            <PhoneLink size="lg" tone="accent" />
          </div>
        </Container>
      </Section>
    </>
  );
}
