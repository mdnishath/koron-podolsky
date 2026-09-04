"use client";

import { useState } from "react";
import { cx } from "./primitives";
import type { Faq } from "@/lib/content";

export function Accordion({ items, defaultOpen = [], single, className }: { items: Faq[]; defaultOpen?: string[]; single?: boolean; className?: string }) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const toggle = (id: string) =>
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (single) return isOpen ? [] : [id];
      return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
    });

  return (
    <div className={cx("kp-accordion", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id} className="kp-accordion__item">
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="kp-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`kp-panel-${item.id}`}
                id={`kp-trigger-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.question}</span>
                <span className="kp-accordion__sign" aria-hidden="true" />
              </button>
            </h3>
            <div className="kp-accordion__region" data-open={isOpen}>
              <div>
                <div id={`kp-panel-${item.id}`} role="region" aria-labelledby={`kp-trigger-${item.id}`} className="kp-accordion__panel" aria-hidden={!isOpen} inert={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
