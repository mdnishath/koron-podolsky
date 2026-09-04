import Image from "next/image";
import Link from "next/link";
import { Button, Container, Disclaimer, Eyebrow, Figure, GoldRule, Monogram, PhoneLink, Section, SectionHeading, SplitPanel, TextLink } from "@/components/ui/primitives";
import { ArticleCard, AttorneyCard, PracticeCard, ResultsGrid } from "@/components/ui/content";
import { IntakeButton } from "@/components/intake/IntakeButton";
import { Parallax } from "@/components/motion/Parallax";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { Marquee } from "@/components/sections/shared";
import { ARTICLES, ATTORNEYS, HOME_RESULTS, TESTIMONIALS } from "@/lib/content";
import { SITE } from "@/lib/site";

const WHY = [
  { title: "We try cases.", body: "Carriers and employers evaluate a matter differently when the firm across the table is prepared to put it in front of a jury." },
  { title: "Two partners, not a pipeline.", body: "The attorney you speak with is the attorney who handles your matter. You will not be handed to a case manager you have never met." },
  { title: "Litigation on both tracks.", body: "Employment and injury work in the same firm, including wage and hour, FEHA retaliation, and contested-causation injury claims." },
  { title: "We take cases selectively.", body: "A deliberately small caseload is what makes partner attention possible. If your matter is not one for us, we will say so early." },
];

const MARQUEE = ["Wrongful termination", "Whistleblower retaliation", "Discrimination and harassment", "Wage and hour", "Severance review", "Vehicle collisions", "Premises liability", "Medical malpractice", "Product liability", "Wrongful death", "Free consultation", "Tarzana · Los Angeles County"];

export default function HomePage() {
  const [koron, podolsky] = ATTORNEYS;
  return (
    <>
      {/* ---------- hero ---------- */}
      <header className="kp-xhero" data-kp-tone="deep">
        <div className="kp-xhero__media">
          <Parallax>
            <Image src="/img/partners-hero.jpg" alt="The firm's two partners in a sunlit office lobby with a wood-panel wall, one standing and one seated" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "68% 12%" }} />
          </Parallax>
        </div>
        <Monogram tone="gold" align="right" />
        <Container>
          <div className="kp-xhero__inner">
            <Eyebrow secondary="Trial attorneys">{SITE.name}</Eyebrow>
            <h1 className="kp-h1 kp-xhero__title">
              <span className="kp-hero-mask">
                <span className="kp-hero-line" style={{ animationDelay: "120ms" }}>
                  Protecting Your Rights.
                </span>
              </span>
              <span className="kp-hero-mask">
                <span className="kp-hero-line" style={{ animationDelay: "210ms" }}>
                  <em className="kp-accent-word">Pursuing Justice.</em>
                </span>
              </span>
            </h1>
            <GoldRule />
            <p className="kp-xhero__lead">We represent employees and injury victims across Los Angeles County — against employers, insurance carriers, and government entities.</p>
            <div className="kp-xhero__actions">
              <IntakeButton variant="plate" size="lg">
                Request a Consultation
              </IntakeButton>
              <Button variant="secondary" size="lg" href="#practices">
                Explore Our Practice Areas
              </Button>
            </div>
            <p className="kp-xhero__note">A guided assessment, about two minutes. Contact details are asked at the end, not the start.</p>
          </div>
        </Container>
        <span className="kp-xhero__scrollcue" aria-hidden="true">
          Scroll
        </span>
        <div className="kp-xhero__strip">
          <Container>
            <div className="kp-xhero__cells">
              <Link className="kp-xhero__cell" href="/employment-law">
                <span className="kp-xhero__cell-label">Employment litigation</span>
                <span className="kp-xhero__cell-value">Wrongful termination · Retaliation · Wage and hour</span>
              </Link>
              <Link className="kp-xhero__cell" href="/personal-injury">
                <span className="kp-xhero__cell-label">Personal injury</span>
                <span className="kp-xhero__cell-value">Collisions · Premises · Wrongful death</span>
              </Link>
              <div className="kp-xhero__cell">
                <span className="kp-xhero__cell-label">Office</span>
                <span className="kp-xhero__cell-value">Tarzana, Los Angeles County</span>
              </div>
              <div className="kp-xhero__cell">
                <span className="kp-xhero__cell-label">Direct line</span>
                <PhoneLink tone="accent" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* ---------- intro ---------- */}
      <Section tone="ivory">
        <Container>
          <SplitPanel ratio="major" offset alignTop>
            <div data-reveal>
              <SectionHeading
                eyebrow="Koron & Podolsky"
                title="Serious advocates for serious cases."
                accentWord="Serious"
                wide
                lead="Sophisticated litigation capability with the attention of a two-partner firm. We represent people rather than institutions: employees pushed out of jobs they were good at, and families whose lives were changed by someone else's negligence."
              />
              <div className="kp-inline-actions" style={{ gap: 28, marginTop: "clamp(24px, 3vw, 32px)" }}>
                <TextLink href="/attorneys">Meet the attorneys</TextLink>
                <TextLink href="/results">Representative results</TextLink>
              </div>
            </div>
            <div data-reveal data-reveal-kind="image" data-reveal-delay={120}>
              <Figure src="/img/partners-lobby.jpg" alt="The firm's two partners in a building lobby in hard afternoon light" ratio="portrait" frame sizes="(min-width: 900px) 40vw, 100vw" />
            </div>
          </SplitPanel>
        </Container>
      </Section>

      {/* ---------- practices ---------- */}
      <Section tone="dark" id="practices" spacing="flush">
        <Marquee items={MARQUEE} />
        <Container>
          <div style={{ paddingBlock: "var(--kp-section-y)" }}>
            <div data-reveal>
              <SectionHeading
                eyebrow="Two practices"
                title="Two kinds of case. One standard of representation."
                accentWord="One standard"
                xwide
                lead="Employment litigation and personal injury are different problems, handled differently. Start with the one that brought you here."
              />
            </div>
            <div className="kp-mt-lg">
              <SplitPanel ratio="even" alignTop className="kp-split--stretch">
                <div data-reveal style={{ display: "flex", height: "100%" }}>
                  <PracticeCard
                    eyebrow="Employment litigation"
                    title="What happens at work should not stay hidden."
                    description="If you were fired for the wrong reason, denied wages you earned, or pushed out after speaking up, you can talk to us privately. A first conversation is confidential, and nothing happens without your direction."
                    items={["Wrongful termination", "Discrimination", "Harassment and retaliation", "Wage and hour", "Contracts and severance"]}
                    href="/employment-law"
                    ctaLabel="Explore Employment Litigation"
                    image="/img/partners-lobby.jpg"
                    imageAlt="The partners in the firm's office lobby"
                  />
                </div>
                <div data-reveal data-reveal-delay={90} style={{ display: "flex", height: "100%" }}>
                  <PracticeCard
                    eyebrow="Personal injury"
                    title="When someone else's negligence upends a life."
                    description="Serious injuries arrive with adjusters, recorded statements, and deadlines all at once. We take on the carrier and the litigation so you can concentrate on recovering, and we begin while the evidence is still there to gather."
                    items={["Vehicle accidents", "Premises liability", "Medical malpractice", "Product liability", "Wrongful death"]}
                    href="/personal-injury"
                    ctaLabel="Explore Personal Injury"
                    image="/img/partners-colonnade.jpg"
                    imageAlt="The partners beneath the columns of a courthouse colonnade"
                  />
                </div>
              </SplitPanel>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- why ---------- */}
      <Section tone="ivory" id="why">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Why Koron & Podolsky" title="Why referring lawyers send us the cases that have to be tried." accentWord="referring lawyers" wide />
          </div>
          <div className="kp-grid kp-grid--2 kp-grid--4" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            {WHY.map((w, i) => (
              <div key={w.title} className="kp-why-item" data-reveal data-reveal-delay={i * 80}>
                <span className="kp-why-item__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------- attorneys ---------- */}
      <Section tone="dark" id="attorneys">
        <Monogram tone="gold" />
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Our attorneys" title="Two partners. Both of them trial lawyers, not case managers." accentWord="trial lawyers" wide />
          </div>
          <div style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
            <SplitPanel ratio="even" offset alignTop>
              <div data-reveal>
                <AttorneyCard name={koron.name} role={koron.role} line="Eleven years practising personal injury before founding the firm. Litigates employment matters including wage and hour and FEHA retaliation claims." credentials={["Southern California Rising Stars, 2015–2020"]} portrait={koron.portrait} portraitAlt={koron.portraitAlt} href={`/attorneys/${koron.slug}`} />
              </div>
              <div data-reveal data-reveal-delay={90}>
                <AttorneyCard name={podolsky.name} role={podolsky.role} line="Litigation background across personal injury, workers' compensation, real property, finance, and employment." credentials={["Southern California Rising Star, 2018–2021", "Lifetime member, Million Dollar Advocates Forum"]} portrait={podolsky.portrait} portraitAlt={podolsky.portraitAlt} href={`/attorneys/${podolsky.slug}`} />
              </div>
            </SplitPanel>
          </div>
        </Container>
      </Section>

      {/* ---------- results ---------- */}
      <Section tone="ivory" id="results">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Representative results" title="Verdicts and settlements, stated plainly and without embellishment." accentWord="plainly" wide lead="A selection of matters the firm has tried and resolved. Every case turns on its own facts." />
          </div>
          <div className="kp-mt-lg">
            <ResultsGrid results={HOME_RESULTS} />
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

      {/* ---------- statement ---------- */}
      <Section tone="deep" warm grain>
        <Monogram tone="gold" align="right" />
        <Container>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 36px)" }}>
            <Eyebrow secondary="Personal representation">Powerful advocacy</Eyebrow>
            <p className="kp-statement">
              <span>
                We fight for <em>justice.</em>
              </span>
              <span>We fight for you.</span>
            </p>
            <GoldRule variant="long" />
            <div className="kp-inline-actions" style={{ marginTop: 8 }}>
              <IntakeButton variant="plate" size="lg">
                Request a Consultation
              </IntakeButton>
              <PhoneLink size="lg" tone="accent" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------- testimonials ---------- */}
      <Section tone="ivory" spacing="sm" id="testimonial">
        <Container width="read">
          <div data-reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 28 }}>
            <Eyebrow>Client experiences</Eyebrow>
            <TestimonialCarousel items={TESTIMONIALS} />
          </div>
        </Container>
      </Section>

      {/* ---------- resources ---------- */}
      <Section tone="white" id="resources">
        <Container>
          <div data-reveal>
            <SectionHeading eyebrow="Resources" title="Plain answers to the first questions people ask us." accentWord="Plain answers" wide />
          </div>
          <div className="kp-grid kp-grid--3 kp-mt-lg">
            {ARTICLES.map((a, i) => (
              <div key={a.slug} data-reveal data-reveal-delay={i * 80} style={{ display: "flex" }}>
                <ArticleCard category={a.category} title={a.title} href={`/resources/${a.slug}`} excerpt={a.excerpt} readTime={a.readTime} />
              </div>
            ))}
          </div>
          <div className="kp-mt-md">
            <TextLink href="/resources" persistent>
              All resources
            </TextLink>
          </div>
        </Container>
      </Section>

      {/* ---------- cta ---------- */}
      <Section tone="dark" hairlineTop>
        <Container>
          <div className="kp-center-stack" data-reveal>
            <SectionHeading eyebrow="Let's talk" title="Your case deserves to be heard." accentWord="heard." align="center" lead="Tell us what happened. The first conversation is with an attorney, and it costs nothing." />
            <div className="kp-center-actions">
              <IntakeButton variant="primary" size="lg">
                Tell Us About Your Case
              </IntakeButton>
              <PhoneLink size="lg" tone="accent" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
