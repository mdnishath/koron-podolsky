import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, Button, Container, Monogram, PhoneLink, Section, SectionHeading, type Tone } from "@/components/ui/primitives";
import { IntakeButton } from "@/components/intake/IntakeButton";
import { Accordion } from "@/components/ui/Accordion";
import type { Faq } from "@/lib/content";

/* Compact page hero with breadcrumbs, used on every interior page. */
export function PageHero({
  eyebrow,
  eyebrowSecondary,
  title,
  accentWord,
  lead,
  crumbs,
  image,
  imageAlt = "",
  imagePosition = "50% 30%",
  actions,
}: {
  eyebrow?: string;
  eyebrowSecondary?: string;
  title: string;
  accentWord?: string;
  lead?: string;
  crumbs: { label: string; href?: string }[];
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  actions?: ReactNode;
}) {
  return (
    <header data-kp-tone="deep" className="kp-hero kp-hero--compact">
      {image ? (
        <div className="kp-hero__media">
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: imagePosition, opacity: 0.55 }} />
        </div>
      ) : null}
      <div className="kp-hero__scrim" aria-hidden="true" />
      <div className="kp-hero__glow" aria-hidden="true" />
      <div className="kp-hero__lines" aria-hidden="true" />
      <Monogram tone="gold" align="right" />
      <Container>
        <div className="kp-hero__inner" style={{ maxWidth: "none" }}>
          <Breadcrumbs items={crumbs} />
          <SectionHeading level="h1" eyebrow={eyebrow} eyebrowSecondary={eyebrowSecondary} title={title} accentWord={accentWord} lead={lead} wide actions={actions} />
        </div>
      </Container>
    </header>
  );
}

/* Closing "Let's talk" section. */
export function CtaSection({
  eyebrow = "Let's talk",
  title,
  accentWord,
  lead,
  buttonLabel = "Tell Us About Your Case",
  href,
  secondary,
  tone = "deep",
}: {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  lead?: string;
  buttonLabel?: string;
  href?: string;
  secondary?: ReactNode;
  tone?: Tone;
}) {
  return (
    <Section tone={tone} warm={tone === "deep"} grain={tone === "deep"} hairlineTop>
      <Monogram tone="gold" align="right" />
      <Container>
        <div className="kp-center-stack" data-reveal>
          <SectionHeading eyebrow={eyebrow} title={title} accentWord={accentWord} align="center" lead={lead} />
          <div className="kp-center-actions">
            {href ? (
              <Button variant="plate" size="lg" href={href}>
                {buttonLabel}
              </Button>
            ) : (
              <IntakeButton variant="plate" size="lg">
                {buttonLabel}
              </IntakeButton>
            )}
            <PhoneLink size="lg" tone="accent" />
          </div>
          {secondary}
        </div>
      </Container>
    </Section>
  );
}

export function FaqSection({ eyebrow = "Questions people actually ask", title, accentWord, lead, faqs, defaultOpen, tone = "white", id }: { eyebrow?: string; title: string; accentWord?: string; lead?: string; faqs: Faq[]; defaultOpen?: string[]; tone?: Tone; id?: string }) {
  return (
    <Section tone={tone} id={id}>
      <Container width="tight">
        <div data-reveal>
          <SectionHeading eyebrow={eyebrow} title={title} accentWord={accentWord} lead={lead} wide />
        </div>
        <div className="kp-mt-md" data-reveal data-reveal-delay={100}>
          <Accordion items={faqs} defaultOpen={defaultOpen ?? [faqs[0]?.id]} single />
        </div>
      </Container>
    </Section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const list = [...items, ...items];
  return (
    <div className="kp-marquee" aria-hidden="true">
      <div className="kp-marquee__track">
        {list.map((item, i) => (
          <span key={i} className="kp-marquee__item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
