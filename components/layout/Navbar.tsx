"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, Container, PhoneLink, cx } from "@/components/ui/primitives";
import { MenuIcon } from "@/components/ui/icons";
import { useIntake } from "@/components/intake/IntakeProvider";
import { NAV, SITE } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const { openIntake } = useIntake();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const transparentHero = pathname === "/";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      // hide on fast downward scroll past the hero, show again on any upward scroll
      setHidden(y > 640 && y > last + 4);
      last = y;
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("kp-lock", menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("kp-lock");
    };
  }, [menuOpen]);

  const isSolid = solid || !transparentHero;

  return (
    <>
      <nav className={cx("kp-nav", isSolid && "kp-nav--solid", hidden && !menuOpen && "kp-nav--hidden")} aria-label="Primary">
        <Container>
          <div className="kp-nav__inner">
            <Link className="kp-nav__brand" href="/">
              <span className="kp-nav__brand-name">{SITE.name}</span>
              <span className="kp-nav__brand-sub">{SITE.tagline}</span>
            </Link>
            <ul className="kp-nav__links">
              {NAV.map((item) => {
                const current = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
                return (
                  <li key={item.href}>
                    <Link className="kp-nav__link" href={item.href} aria-current={current ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="kp-nav__actions">
              <PhoneLink tone="accent" />
              <Button className="kp-nav__cta" variant="primary" size="sm" onClick={openIntake}>
                Request a Consultation
              </Button>
              <button className="kp-nav__burger" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
                <MenuIcon />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div className="kp-menu" key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.26 }}>
            <div className="kp-menu__head">
              <span className="kp-menu__brand">{SITE.name}</span>
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="kp-iconbtn">
                ×
              </button>
            </div>
            <nav aria-label="Menu" className="kp-menu__nav">
              {[{ label: "Home", href: "/" }, ...NAV, { label: "What to Expect", href: "/what-to-expect" }, { label: "Resources", href: "/resources" }].map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={item.href} className="kp-menu__link" onClick={() => setMenuOpen(false)}>
                    <span>{item.label}</span>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div className="kp-menu__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
              <PhoneLink size="lg" tone="accent" />
              <Button
                variant="primary"
                size="lg"
                block
                onClick={() => {
                  setMenuOpen(false);
                  openIntake();
                }}
              >
                Request a Consultation
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
