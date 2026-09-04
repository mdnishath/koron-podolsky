"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Testimonial } from "@/components/ui/content";
import type { TestimonialItem } from "@/lib/content";

export function TestimonialCarousel({ items, interval = 7000 }: { items: TestimonialItem[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [paused, items.length, interval]);

  const current = items[index];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, width: "100%" }}>
      <div style={{ position: "relative", width: "100%", minHeight: 240, display: "grid" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={index} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ gridArea: "1 / 1" }}>
            <Testimonial quote={current.quote} attribution={current.attribution} context={current.context} center />
          </motion.div>
        </AnimatePresence>
      </div>
      {items.length > 1 ? (
        <div role="tablist" aria-label="Testimonials" style={{ display: "flex", gap: 10 }}>
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              type="button"
              style={{
                width: i === index ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: 0,
                padding: 0,
                cursor: "pointer",
                background: i === index ? "var(--kp-accent)" : "var(--kp-hairline-strong)",
                transition: "width 400ms cubic-bezier(0.16,1,0.3,1), background-color 260ms",
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
