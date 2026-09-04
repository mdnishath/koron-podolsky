import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/sections/shared";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles the information you share through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="What we collect, and what we do with it." accentWord="what we do" lead="This policy describes how information submitted through this website is handled. It is written plainly, because you should be able to understand it without a lawyer." crumbs={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]} />
      <Section tone="ivory">
        <Container width="read">
          <div className="kp-longform" data-reveal>
            <p className="kp-longform__lead">Last updated: September 2026. This policy applies to the website of {SITE.name} and to information you provide through it.</p>

            <h2>Information you give us</h2>
            <p>When you use the guided assessment or the contact form, we receive the information you type: your name, phone number, email address, the practice area and answers you select, and anything you write about your matter. Nothing is transmitted until you press the button that sends it. Answers you select before that point stay in your browser.</p>

            <h2>How we use it</h2>
            <ul>
              <li>To contact you about the consultation you requested</li>
              <li>To assess, in confidence, whether your matter is one the firm can take on</li>
              <li>To keep a record of the inquiry as required by our professional obligations</li>
            </ul>
            <p>We do not sell, rent, or share your information with third parties for their own marketing. Information is shared only with service providers who help us operate the website and deliver messages to the firm, and only for that purpose.</p>

            <h2>Confidentiality and the attorney-client relationship</h2>
            <p>Contacting the firm through this website does not by itself create an attorney-client relationship. We treat inquiries as confidential and do not contact your employer, an insurer, or anyone else without your direction. Please do not send highly sensitive documents through the website. If we take on your matter, we will arrange a secure way to receive them.</p>

            <h2>Information collected automatically</h2>
            <p>Our hosting provider collects standard technical information, such as the pages requested, the time of the request, and the type of browser used, to keep the site running and secure. This website does not use advertising trackers. If analytics are enabled in future, this policy will be updated to say so.</p>

            <h2>Retention</h2>
            <p>Inquiry records are kept for as long as needed to respond to you and to satisfy the firm&apos;s record-keeping obligations, after which they are deleted or archived in accordance with the firm&apos;s retention practice.</p>

            <h2>Your choices</h2>
            <p>You may ask us to correct or delete information you have provided, subject to obligations that require us to retain it. Write to {SITE.email} or call {SITE.phone}. California residents have additional rights under state privacy law, including the right to know what personal information a business has collected about them.</p>

            <h2>Contact</h2>
            <p>
              {SITE.name}, {SITE.address.line1}, {SITE.address.line2}. Questions about this policy can be sent to {SITE.email}.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
