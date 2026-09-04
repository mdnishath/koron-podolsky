import type { Metadata } from "next";
import { ConfidentialityNote, Container, Disclaimer, Section, SectionHeading, TextLink } from "@/components/ui/primitives";
import { ProcessSteps, ResultsGrid } from "@/components/ui/content";
import { CtaSection, FaqSection, PageHero } from "@/components/sections/shared";
import { TERMINATION_FAQS, TERMINATION_RESULTS, TERMINATION_STEPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wrongful Termination Lawyers in Los Angeles",
  description:
    "California is at-will, but at-will has limits. What wrongful termination means, the terminations that tend to be unlawful, what proves the case, and what to do this week.",
  alternates: { canonical: "/employment-law/wrongful-termination" },
};

const DO_NOW = [
  { title: "Write down the sequence", body: "Dates, who said what, and who was present. Do it now, while it is precise. Memory of order and wording fades faster than memory of events." },
  { title: "Gather what you already have", body: "Offer letter, reviews, pay statements, the termination letter, and messages you already possess. Do not take material you were not entitled to have." },
  { title: "Do not sign yet", body: "A severance agreement usually asks you to release claims you may not know you have. Having it read first costs far less than signing first." },
  { title: "Ask early", body: "A first conversation is confidential and costs nothing. Deadlines run whether or not anyone is advising you." },
];

export default function WrongfulTerminationPage() {
  return (
    <>
      <PageHero
        eyebrow="Employment litigation"
        eyebrowSecondary="Wrongful termination"
        title="Being fired is not always lawful, even in an at-will state."
        accentWord="not always lawful"
        lead="California is at-will, but at-will has limits. If your termination followed something you reported, requested, or refused, the reason matters."
        crumbs={[{ label: "Home", href: "/" }, { label: "Employment litigation", href: "/employment-law" }, { label: "Wrongful termination" }]}
      />

      <Section tone="dark" spacing="sm">
        <Container>
          <div data-reveal>
            <ConfidentialityNote />
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container width="read">
          <div className="kp-longform" data-reveal>
            <h2>What wrongful termination actually means</h2>
            <p>In California, an employer can usually end employment without giving a reason. That is what at-will means, and it is why being treated unfairly is not the same as being treated unlawfully. The question is never whether the decision was harsh. It is whether the reason behind it was one the law prohibits.</p>
            <p>A termination is unlawful when the real reason is a protected characteristic, protected activity, or the exercise of a legal right. The employer will rarely say so. Instead, a reason appears — a reorganisation, a performance concern that was not raised before, a policy applied to you and to nobody else. Establishing the real reason is the work of the case.</p>

            <h2>The terminations that tend to be unlawful</h2>
            <ul>
              <li>Termination after reporting suspected illegal conduct internally or to an agency</li>
              <li>Termination after complaining about unpaid wages, missed breaks, or safety</li>
              <li>Termination after requesting a disability accommodation or medical leave</li>
              <li>Termination shortly after disclosing a pregnancy or taking protected leave</li>
              <li>Termination that follows a discrimination or harassment complaint</li>
              <li>Termination for refusing to do something unlawful</li>
              <li>Constructive discharge — conditions made intolerable so that you resign</li>
            </ul>
            <p>Timing carries weight. When a termination follows closely on protected activity, that sequence is evidence, and an employer has to explain it with something more than a general reference to fit or performance.</p>

            <h2>What proves the case</h2>
            <p>These matters are decided on documents far more often than on recollection. What existed in writing before the termination — and what the employer wrote at the time — usually determines the outcome.</p>
            <h3>What tends to help</h3>
            <ul>
              <li>Performance reviews and any written praise from before the complaint</li>
              <li>The complaint itself, in whatever form it was made</li>
              <li>Emails and messages around the decision</li>
              <li>The termination letter and the stated reason</li>
              <li>Pay records, schedules, and time records</li>
              <li>Names of colleagues who saw or heard what happened</li>
            </ul>
            <h3>What tends to hurt</h3>
            <ul>
              <li>Taking material you were not entitled to take, including confidential files</li>
              <li>Signing a severance agreement before it is reviewed</li>
              <li>Describing events differently at different times</li>
              <li>Waiting until a deadline has run</li>
            </ul>

            <h2>Deadlines, plainly</h2>
            <p>Different claims carry different deadlines, and some California employment claims begin with an administrative filing that runs in months rather than years. Where a public entity is the employer, the timeline can be shorter still. Because the applicable deadline depends on the particular facts, the only responsible answer is to have it assessed rather than assumed — and to do it early.</p>
            <blockquote>The safest assumption about any deadline is that it is closer than it looks. Ask before you need to know.</blockquote>
            <Disclaimer>General information about California law, not legal advice about your matter. Specific limitation periods depend on the claim and the facts, and should be confirmed with an attorney.</Disclaimer>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="What to do now" title="Four things worth doing this week." accentWord="this week" wide lead="None of this commits you to a claim. All of it protects your position if you decide to bring one." />
          </div>
          <div className="kp-cells kp-cells--2 kp-mt-md">
            {DO_NOW.map((d, i) => (
              <div key={d.title} className="kp-cell" data-reveal data-reveal-delay={i * 80}>
                <span className="kp-cell__label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="kp-cell__title">{d.title}</h3>
                <p className="kp-cell__body">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container width="tight">
          <div data-reveal>
            <SectionHeading eyebrow="How a case moves" title="What the process looks like from here." accentWord="the process" wide />
          </div>
          <div className="kp-mt-md">
            <ProcessSteps steps={TERMINATION_STEPS} />
          </div>
          <div style={{ marginTop: 28 }}>
            <TextLink href="/what-to-expect" persistent>
              The full walkthrough, with timelines
            </TextLink>
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Representative results" title="Termination and retaliation matters the firm has tried." accentWord="has tried" wide />
          </div>
          <div className="kp-mt-md">
            <ResultsGrid results={TERMINATION_RESULTS} />
          </div>
          <div style={{ maxWidth: "64ch", marginTop: 24 }}>
            <Disclaimer kind="results" />
          </div>
        </Container>
      </Section>

      <FaqSection title="Wrongful termination, answered plainly." accentWord="answered plainly" faqs={TERMINATION_FAQS} tone="dark" />

      <CtaSection title="Tell us why you were let go." accentWord="why" lead="A guided assessment, about two minutes. Contact details are asked at the end, not the start." href="/tell-us-about-your-case" />
    </>
  );
}
