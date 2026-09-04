import { Button, Container, PhoneLink, Section, SectionHeading } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Section tone="deep" warm grain className="kp-hero">
      <Container>
        <div className="kp-center-stack" style={{ paddingTop: 60 }}>
          <SectionHeading eyebrow="Page not found" title="That page is not here, but we are." accentWord="we are" align="center" lead="The address may have changed. Start from the home page, or call the office and ask for either partner." />
          <div className="kp-center-actions">
            <Button variant="plate" size="lg" href="/">
              Back to the home page
            </Button>
            <PhoneLink size="lg" tone="accent" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
