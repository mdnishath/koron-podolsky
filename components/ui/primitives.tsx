import Link from "next/link";
import Image from "next/image";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { ArrowRightIcon, PhoneIcon, ShieldIcon } from "./icons";
import { DISCLAIMERS, SITE } from "@/lib/site";

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

/* ---------- brand ---------- */
export function Eyebrow({
  children,
  secondary,
  tone = "accent",
  as: Tag = "p",
  className,
}: {
  children: ReactNode;
  secondary?: ReactNode;
  tone?: "accent" | "muted";
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={cx("kp-eyebrow", tone === "muted" && "kp-eyebrow--muted", className)}>
      <span>{children}</span>
      {secondary ? (
        <>
          <span className="kp-eyebrow__sep" aria-hidden="true" />
          <span>{secondary}</span>
        </>
      ) : null}
    </Tag>
  );
}

export function GoldRule({ variant = "short", className }: { variant?: "short" | "long" | "full" | "vertical"; className?: string }) {
  return (
    <hr
      aria-hidden="true"
      className={cx(
        "kp-rule",
        variant === "long" && "kp-rule--long",
        variant === "full" && "kp-rule--full",
        variant === "vertical" && "kp-rule--vertical",
        className,
      )}
    />
  );
}

export function splitAccent(title: string, accentWord?: string): ReactNode {
  if (!accentWord) return title;
  const at = title.indexOf(accentWord);
  if (at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <em className="kp-accent-word">{accentWord}</em>
      {title.slice(at + accentWord.length)}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowSecondary,
  title,
  accentWord,
  lead,
  level = "h2",
  align = "left",
  wide,
  xwide,
  hideRule,
  actions,
  className,
}: {
  eyebrow?: ReactNode;
  eyebrowSecondary?: ReactNode;
  title: string;
  accentWord?: string;
  lead?: ReactNode;
  level?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  wide?: boolean;
  xwide?: boolean;
  hideRule?: boolean;
  actions?: ReactNode;
  className?: string;
}) {
  const Tag = level;
  const headingClass = level === "h1" ? "kp-h1" : level === "h3" ? "kp-h3" : "kp-h2";
  return (
    <div className={cx("kp-heading", align === "center" && "kp-heading--center", wide && "kp-heading--wide", xwide && "kp-heading--xwide", className)}>
      {eyebrow ? <Eyebrow secondary={eyebrowSecondary}>{eyebrow}</Eyebrow> : null}
      <Tag className={cx(headingClass, "kp-heading__title")}>{splitAccent(title, accentWord)}</Tag>
      {hideRule ? null : <GoldRule />}
      {lead ? <p className="kp-heading__lead">{lead}</p> : null}
      {actions ? <div className="kp-hero__actions">{actions}</div> : null}
    </div>
  );
}

export function Monogram({ children = "K&P", tone = "ivory", align = "left", className }: { children?: ReactNode; tone?: "ivory" | "gold"; align?: "left" | "right"; className?: string }) {
  return (
    <span aria-hidden="true" className={cx("kp-monogram", tone === "gold" && "kp-monogram--gold", align === "right" && "kp-monogram--right", className)}>
      {children}
    </span>
  );
}

/* ---------- actions ---------- */
type ButtonBase = {
  children: ReactNode;
  variant?: "primary" | "plate" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  block?: boolean;
  className?: string;
};
type ButtonAsLink = ButtonBase & { href: string; onClick?: never; type?: never; disabled?: never };
type ButtonAsButton = ButtonBase & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", withArrow, block, className } = props;
  const showArrow = withArrow ?? (variant === "plate" || variant === "ghost");
  const classes = cx("kp-btn", `kp-btn--${variant}`, size !== "md" && `kp-btn--${size}`, block && "kp-btn--block", className);
  const body = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span className="kp-btn__icon">
          <ArrowRightIcon />
        </span>
      ) : null}
    </>
  );
  if ("href" in props && props.href) {
    const isExternal = /^(https?:|tel:|mailto:)/.test(props.href);
    if (isExternal)
      return (
        <a className={classes} href={props.href}>
          {body}
        </a>
      );
    return (
      <Link className={classes} href={props.href}>
        {body}
      </Link>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href: _h, variant: _v, size: _s, withArrow: _w, block: _b, className: _c, children: _ch, type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} type={type} {...rest}>
      {body}
    </button>
  );
}

export function TextLink({ children, href, withArrow = true, persistent, quiet, className }: { children: ReactNode; href: string; withArrow?: boolean; persistent?: boolean; quiet?: boolean; className?: string }) {
  const classes = cx("kp-link", persistent && "kp-link--persistent", quiet && "kp-link--quiet", className);
  const inner = (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowRightIcon /> : null}
    </>
  );
  if (/^(https?:|tel:|mailto:|#)/.test(href))
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

export function PhoneLink({ label, size = "md", tone = "default", withIcon = true, className }: { label?: string; size?: "md" | "lg"; tone?: "default" | "accent"; withIcon?: boolean; className?: string }) {
  return (
    <a href={SITE.phoneHref} className={cx("kp-phone", size === "lg" && "kp-phone--lg", tone === "accent" && "kp-phone--accent", className)}>
      {withIcon ? <PhoneIcon className="kp-phone__icon" /> : null}
      <span>{label ?? SITE.phone}</span>
    </a>
  );
}

/* ---------- layout ---------- */
export type Tone = "dark" | "deep" | "ivory" | "white";

export function Section({
  children,
  tone = "dark",
  spacing = "default",
  warm,
  grain,
  oxblood,
  hairlineTop,
  as: Tag = "section",
  id,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  spacing?: "default" | "sm" | "flush";
  warm?: boolean;
  grain?: boolean;
  oxblood?: boolean;
  hairlineTop?: boolean;
  as?: ElementType;
  id?: string;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      data-kp-tone={tone}
      className={cx(
        "kp-section",
        spacing === "sm" && "kp-section--sm",
        spacing === "flush" && "kp-section--flush",
        warm && "kp-section--warm",
        grain && "kp-section--grain",
        oxblood && "kp-section--oxblood",
        hairlineTop && "kp-section--hairline-top",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Container({ children, width = "default", as: Tag = "div", className }: { children: ReactNode; width?: "default" | "tight" | "read" | "wide"; as?: ElementType; className?: string }) {
  return <Tag className={cx("kp-container", width !== "default" && `kp-container--${width}`, className)}>{children}</Tag>;
}

export function SplitPanel({ children, ratio = "even", reverse, offset, alignTop, className }: { children: ReactNode; ratio?: "even" | "major" | "minor"; reverse?: boolean; offset?: boolean; alignTop?: boolean; className?: string }) {
  return <div className={cx("kp-split", `kp-split--${ratio}`, reverse && "kp-split--reverse", offset && "kp-split--offset", alignTop && "kp-split--top", className)}>{children}</div>;
}

/* ---------- media ---------- */
export function Figure({
  src,
  alt,
  ratio = "landscape",
  scrim,
  frame,
  caption,
  overlay,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: {
  src: string;
  alt: string;
  ratio?: "portrait" | "landscape" | "wide" | "cinema" | "auto";
  scrim?: boolean;
  frame?: boolean;
  caption?: ReactNode;
  overlay?: ReactNode;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cx("kp-figure", ratio !== "auto" && `kp-figure--${ratio}`, scrim && "kp-figure--scrim", frame && "kp-figure--frame", className)}>
      <Image className="kp-figure__media" src={src} alt={alt} fill sizes={sizes} priority={priority} />
      {overlay ? <div className="kp-figure__body">{overlay}</div> : null}
      {caption ? <figcaption className="kp-figure__caption">{caption}</figcaption> : null}
    </figure>
  );
}

/* ---------- compliance ---------- */
export function Disclaimer({ kind = "results", children, variant = "plain", inline, className }: { kind?: "results" | "advertising" | "relationship"; children?: ReactNode; variant?: "plain" | "boxed"; inline?: boolean; className?: string }) {
  const text = children ?? DISCLAIMERS[kind];
  return <p className={cx("kp-disclaimer", variant === "boxed" && "kp-disclaimer--boxed", inline && "kp-disclaimer--inline", className)}>{text}</p>;
}

export function ConfidentialityNote({
  title = "Your conversation with us is confidential",
  children = "Consultations are private and protected. We understand the risk of retaliation, and we will not contact your employer, your colleagues, or anyone else without your direction.",
  className,
}: {
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <aside className={cx("kp-confidential", className)}>
      <ShieldIcon className="kp-confidential__icon" width={20} height={20} viewBox="0 0 16 16" />
      <div>
        <p className="kp-confidential__title">{title}</p>
        <p className="kp-confidential__body">{children}</p>
      </div>
    </aside>
  );
}

export function Breadcrumbs({ items, className }: { items: { label: string; href?: string }[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cx("kp-crumbs", className)}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label}>
              {item.href && !last ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
              {last ? null : (
                <span className="kp-crumbs__sep" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Placeholder({ label = "CLIENT TO SUPPLY", children, variant = "block", className }: { label?: string; children?: ReactNode; variant?: "block" | "media"; className?: string }) {
  return (
    <div className={cx("kp-placeholder", variant === "media" && "kp-placeholder--media", className)} data-kp-placeholder={label}>
      <span className="kp-placeholder__tag">[PLACEHOLDER — {label}]</span>
      {children ? <p className="kp-placeholder__note">{children}</p> : null}
    </div>
  );
}
