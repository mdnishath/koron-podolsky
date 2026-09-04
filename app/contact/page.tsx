import type { Metadata } from "next";
import { Container, Eyebrow, GoldRule, Section, SectionHeading } from "@/components/ui/primitives";
import { PinIcon } from "@/components/ui/icons";
import { CtaSection, PageHero } from "@/components/sections/shared";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${SITE.phone}, or write and we will call you. One office, on Ventura Boulevard in Tarzana, serving Los Angeles County.`,
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=15&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapQuery)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Call the office, or write and we will call you."
        accentWord="Call the office"
        lead="One office, in Tarzana. Both partners take calls, and if we are in court you will hear back."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section tone="ivory">
        <Container>
          <div className="kp-contact-grid">
            <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 34px)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Eyebrow>Speak with an attorney</Eyebrow>
                <a className="kp-phone-display" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
                <GoldRule />
              </div>
              <div className="kp-detail">
                <div className="kp-detail__row">
                  <span className="kp-detail__label">Office</span>
                  <div>
                    <p className="kp-detail__value">
                      {SITE.address.line1}
                      <br />
                      {SITE.address.line2}
                    </p>
                    <p className="kp-detail__note">{SITE.serving}</p>
                  </div>
                </div>
                <div className="kp-detail__row">
                  <span className="kp-detail__label">Hours</span>
                  <div>
                    {SITE.hours.map((h) => (
                      <p key={h.days} className="kp-detail__value" style={{ display: "flex", gap: 16, justifyContent: "space-between", maxWidth: 320 }}>
                        <span>{h.days}</span>
                        <span style={{ color: "var(--kp-text-muted)" }}>{h.time}</span>
                      </p>
                    ))}
                    <p className="kp-detail__note">{SITE.afterHours}</p>
                  </div>
                </div>
                <div className="kp-detail__row">
                  <span className="kp-detail__label">Email</span>
                  <div>
                    <p className="kp-detail__value">
                      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    </p>
                    <p className="kp-detail__note">For a first message, keep it brief and do not include anything highly sensitive. An attorney will reply and arrange a private conversation.</p>
                  </div>
                </div>
                <div className="kp-detail__row">
                  <span className="kp-detail__label">Parking</span>
                  <div>
                    <p className="kp-detail__value">Validated parking is available in the building garage, entered from Ventura Boulevard.</p>
                    <p className="kp-detail__note">Take the lobby elevator to the second floor. Suite 208 is to the right as you exit. The building is wheelchair accessible.</p>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal data-reveal-delay={90}>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark" spacing="sm">
        <Container>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionHeading eyebrow="Finding us" title="18801 Ventura Blvd., Suite 208." accentWord="Suite 208." wide lead="On Ventura Boulevard in Tarzana, in the San Fernando Valley. Sherman Oaks, Encino, and Woodland Hills are minutes away." />
            <div className="kp-map">
              <iframe src={mapSrc} title="Map showing the office of Koron & Podolsky, LLP in Tarzana" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              <span className="kp-map__pin" aria-hidden="true">
                <PinIcon />
              </span>
              <div className="kp-map__card">
                <strong style={{ fontFamily: "var(--kp-font-display)", fontWeight: 400, fontSize: "1.1rem" }}>{SITE.name}</strong>
                <span>
                  {SITE.address.line1}, {SITE.address.line2}
                </span>
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="kp-link" style={{ minHeight: 0, marginTop: 4 }}>
                  <span>Get directions</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection title="Some things are easier said out loud." accentWord="out loud." lead="Call the office and ask for either partner. If your matter is time-sensitive, calling is faster than writing." href="/tell-us-about-your-case" />
    </>
  );
}
