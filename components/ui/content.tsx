import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx, Disclaimer, Eyebrow, TextLink } from "./primitives";
import { CountUpFigure } from "@/components/motion/CountUp";
import type { CaseResult, ProcessStep } from "@/lib/content";

export function ResultCard({ result, showDisclaimer = true, animate = true, className }: { result: CaseResult; showDisclaimer?: boolean; animate?: boolean; className?: string }) {
  const { label, outcome, figure, wordsOnly, description } = result;
  return (
    <article className={cx("kp-result", className)}>
      <span className="kp-result__label">
        {label}
        {outcome ? ` · ${outcome}` : ""}
      </span>
      <p className={cx("kp-result__figure", wordsOnly && "kp-result__figure--words")}>{animate && !wordsOnly ? <CountUpFigure value={figure} /> : figure}</p>
      <p className="kp-result__desc">{description}</p>
      {showDisclaimer ? <Disclaimer inline /> : null}
    </article>
  );
}

export function ResultsGrid({ results, columns = 2, className }: { results: CaseResult[]; columns?: 2 | 3; className?: string }) {
  return (
    <div className={cx("kp-cells", columns === 3 ? "kp-cells--3" : "kp-cells--2", className)}>
      {results.map((r, i) => (
        <div key={r.id} className="kp-cell" data-reveal data-reveal-delay={i * 70}>
          <ResultCard result={r} showDisclaimer={false} />
        </div>
      ))}
    </div>
  );
}

export function AttorneyCard({
  name,
  role = "Partner",
  line,
  credentials,
  portrait,
  portraitAlt,
  href,
  className,
}: {
  name: string;
  role?: string;
  line?: string;
  credentials?: string[];
  portrait: string;
  portraitAlt?: string;
  href?: string;
  className?: string;
}) {
  return (
    <article className={cx("kp-attorney", className)}>
      <Link href={href ?? "#"} className="kp-attorney__portrait" aria-label={`${name}, ${role}`}>
        <Image src={portrait} alt={portraitAlt ?? `${name}, ${role}`} fill sizes="(min-width: 900px) 40vw, 100vw" />
      </Link>
      <div className="kp-attorney__body">
        <span className="kp-attorney__role">{role}</span>
        <h3 className="kp-attorney__name">{name}</h3>
        {line ? <p className="kp-attorney__line">{line}</p> : null}
        {credentials?.length ? (
          <ul className="kp-attorney__creds">
            {credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        ) : null}
        {href ? <TextLink href={href}>Read full biography</TextLink> : null}
      </div>
    </article>
  );
}

export function PracticeCard({
  eyebrow,
  title,
  description,
  items,
  href,
  ctaLabel = "Explore this practice",
  image,
  imageAlt = "",
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items?: string[];
  href: string;
  ctaLabel?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  return (
    <article className={cx("kp-practice", className)}>
      {image ? (
        <Link href={href} className="kp-practice__media" tabIndex={-1} aria-hidden="true">
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 900px) 50vw, 100vw" />
        </Link>
      ) : null}
      <div className="kp-practice__body">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="kp-h3">{title}</h3>
        <p className="kp-practice__desc">{description}</p>
        {items?.length ? (
          <ul className="kp-practice__list">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        <div className="kp-practice__foot">
          <TextLink href={href}>{ctaLabel}</TextLink>
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ title, href, category, date, readTime, excerpt, className }: { title: string; href: string; category?: string; date?: string; readTime?: string; excerpt?: string; className?: string }) {
  return (
    <article className={cx("kp-article", className)}>
      {category || date ? (
        <p className="kp-article__meta">
          {category ? <strong>{category}</strong> : null}
          {category && date ? <span aria-hidden="true">·</span> : null}
          {date ? <span>{date}</span> : null}
        </p>
      ) : null}
      <h3 className="kp-article__title">
        <Link href={href}>{title}</Link>
      </h3>
      {excerpt ? <p className="kp-article__excerpt">{excerpt}</p> : null}
      {readTime ? <span className="kp-article__read">{readTime}</span> : null}
    </article>
  );
}

export function StatBlock({ value, label, className }: { value: string; label: ReactNode; className?: string }) {
  return (
    <div className={cx("kp-stat", className)}>
      <span className="kp-stat__value">
        <CountUpFigure value={value} />
      </span>
      <span className="kp-stat__label">{label}</span>
    </div>
  );
}

export function ProcessSteps({ steps, className }: { steps: ProcessStep[]; className?: string }) {
  return (
    <ol className={cx("kp-process", className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="kp-process__item" data-reveal data-reveal-delay={i * 80}>
          <span className="kp-process__index" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="kp-process__title">{step.title}</h3>
            <p className="kp-process__body">{step.body}</p>
            {step.timing ? <span className="kp-process__timing">{step.timing}</span> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Testimonial({ quote, attribution, context, center, showDisclaimer = true, className }: { quote: string; attribution?: string; context?: string; center?: boolean; showDisclaimer?: boolean; className?: string }) {
  return (
    <figure className={cx("kp-testimonial", center && "kp-testimonial--center", className)}>
      <span className="kp-testimonial__mark" aria-hidden="true">
        “
      </span>
      <blockquote className="kp-testimonial__quote">{quote}</blockquote>
      {attribution || context ? (
        <figcaption className="kp-testimonial__attribution">
          {attribution ? <span className="kp-testimonial__who">{attribution}</span> : null}
          {context ? <span className="kp-testimonial__what">{context}</span> : null}
        </figcaption>
      ) : null}
      {showDisclaimer ? <Disclaimer /> : null}
    </figure>
  );
}
