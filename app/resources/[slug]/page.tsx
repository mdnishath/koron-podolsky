import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfidentialityNote, Container, Disclaimer, Eyebrow, Section, TextLink } from "@/components/ui/primitives";
import { ArticleCard } from "@/components/ui/content";
import { CtaSection, PageHero } from "@/components/sections/shared";
import { ARTICLES, getArticle } from "@/lib/content";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt, alternates: { canonical: `/resources/${a.slug}` }, openGraph: { type: "article", publishedTime: a.date } };
}

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const related = ARTICLES.filter((x) => x.slug !== a.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/resources/${a.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={a.category} eyebrowSecondary={`${fmt(a.date)} · ${a.readTime}`} title={a.title} lead={a.excerpt} crumbs={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: a.title }]} />

      <Section tone="ivory">
        <Container width="read">
          <article className="kp-longform" data-reveal>
            {a.sections.map((s, i) => (
              <div key={i}>
                {s.heading ? <h2>{s.heading}</h2> : null}
                {s.list ? (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : null}
                {s.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)} className={i === 0 ? "kp-longform__lead" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
              {a.track === "employment" ? <ConfidentialityNote /> : null}
              <Disclaimer>General information about California law, written for a general audience. It is not legal advice about your matter, and reading it does not create an attorney-client relationship. Deadlines and outcomes depend on facts specific to you.</Disclaimer>
              <TextLink href={a.track === "employment" ? "/employment-law" : "/personal-injury"} persistent>
                {a.track === "employment" ? "Employment litigation at the firm" : "Personal injury at the firm"}
              </TextLink>
            </div>
          </article>
        </Container>
      </Section>

      <Section tone="white" spacing="sm">
        <Container>
          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Eyebrow>Read next</Eyebrow>
            <div className="kp-grid kp-grid--2">
              {related.map((r) => (
                <ArticleCard key={r.slug} category={r.category} title={r.title} href={`/resources/${r.slug}`} excerpt={r.excerpt} readTime={r.readTime} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection title="Reading is a good start. Asking is better." accentWord="Asking" lead="A guided assessment, about two minutes. Contact details are asked at the end, not the start." href="/tell-us-about-your-case" />
    </>
  );
}
