import Link from "next/link";
import { Container, Monogram, PhoneLink } from "@/components/ui/primitives";
import { DISCLAIMERS, FOOTER_COLUMNS, SITE, UTILITY_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="kp-footer" data-kp-tone="deep">
      <Monogram tone="gold" align="right" />
      <Container>
        <div className="kp-footer__grid">
          <div className="kp-footer__brand">
            <span className="kp-footer__name">{SITE.name}</span>
            <p style={{ margin: 0 }}>{SITE.description}</p>
            <address style={{ fontStyle: "normal" }}>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
            </address>
            <PhoneLink tone="accent" />
            <a href={`mailto:${SITE.email}`} style={{ color: "var(--kp-stone-500)", textDecoration: "none", fontSize: "var(--kp-sm)" }}>
              {SITE.email}
            </a>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="kp-footer__col-title">{col.title}</p>
              <ul className="kp-footer__list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="kp-footer__legal">
          <p>{DISCLAIMERS.advertising}</p>
          <p>{DISCLAIMERS.results}</p>
          <p>{DISCLAIMERS.relationship}</p>
          <div className="kp-footer__meta">
            <span>© {new Date().getFullYear()} {SITE.name}</span>
            <a href={SITE.designer.href} target="_blank" rel="noopener noreferrer">
              {SITE.designer.label}
            </a>
            {UTILITY_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
