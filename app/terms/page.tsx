import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/shared";
import { DISCLAIMERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Disclaimer",
  description: "The terms on which this website is provided, and the disclaimers that apply to its content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms and disclaimer" title="Read this before relying on anything here." accentWord="relying" lead="This website is general information about a law firm and about California law. It is not legal advice, and it is not a substitute for a conversation with an attorney about your own facts." crumbs={[{ label: "Home", href: "/" }, { label: "Terms and disclaimer" }]} />
      <Section tone="ivory">
        <Container width="read">
          <div className="kp-longform" data-reveal>
            <h2>Attorney advertising</h2>
            <p>{DISCLAIMERS.advertising} {SITE.name} is a law firm located in Tarzana, California. Its attorneys are licensed to practise in the State of California. The firm does not seek to represent anyone in a jurisdiction where this website does not comply with applicable rules.</p>

            <h2>No legal advice</h2>
            <p>The content of this website, including the guided assessment and the resources section, is provided for general informational purposes only. It is not legal advice, may not reflect the most current legal developments, and should not be acted upon without consulting an attorney about your specific situation. Deadlines in particular depend on facts that this website cannot know.</p>

            <h2>No attorney-client relationship</h2>
            <p>{DISCLAIMERS.relationship} An attorney-client relationship is formed only by a written engagement agreement signed by the firm. Until then, information you send may not be treated as privileged, although we handle all inquiries in confidence.</p>

            <h2>Prior results</h2>
            <p>{DISCLAIMERS.results} The representative results published on this website are described exactly as reported and are not aggregated, rounded, or extended. They are provided to illustrate the kinds of matters the firm has handled, not as a prediction about any other matter.</p>

            <h2>Testimonials</h2>
            <p>Client experiences shown on this website are provided with the client&apos;s consent and with identifying details removed. They describe one person&apos;s experience and are not a guarantee, warranty, or prediction of the outcome of any other matter.</p>

            <h2>Links and third-party content</h2>
            <p>This website may link to third-party sites and services, including a map provider. The firm does not control and is not responsible for their content or privacy practices.</p>

            <h2>Limitation of liability</h2>
            <p>To the fullest extent permitted by law, the firm disclaims liability for any loss arising from reliance on the content of this website. The website is provided as is, without warranty of any kind.</p>

            <h2>Contact</h2>
            <p>
              {SITE.name}, {SITE.address.line1}, {SITE.address.line2}. Telephone {SITE.phone}.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
