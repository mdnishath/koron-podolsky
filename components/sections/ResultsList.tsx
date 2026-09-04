"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Disclaimer } from "@/components/ui/primitives";
import { FilterBar } from "@/components/ui/forms";
import { CountUpFigure } from "@/components/motion/CountUp";
import { RESULTS, type Track } from "@/lib/content";

type Filter = "all" | Track;

export function ResultsList() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = RESULTS.filter((r) => filter === "all" || r.track === filter);
  const employment = RESULTS.filter((r) => r.track === "employment").length;
  const injury = RESULTS.length - employment;

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <FilterBar
          options={[
            { id: "all", label: "All matters", count: RESULTS.length },
            { id: "employment", label: "Employment", count: employment },
            { id: "injury", label: "Personal injury", count: injury },
          ]}
          value={filter}
          onChange={(id) => setFilter(id as Filter)}
        />
        <p style={{ margin: 0, fontSize: "var(--kp-sm)", color: "var(--kp-text-faint)" }} aria-live="polite">
          {shown.length === RESULTS.length ? `Showing all ${RESULTS.length} published matters` : `Showing ${shown.length} of ${RESULTS.length} published matters`}
        </p>
      </div>

      <div style={{ marginTop: "clamp(20px, 3vw, 32px)" }}>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((r) => (
            <motion.div key={r.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }} className="kp-res-row">
              <div>
                <span className="kp-res-label">
                  {r.label} · {r.outcome}
                </span>
                <p className={r.wordsOnly ? "kp-res-figure kp-res-figure--words" : "kp-res-figure"}>{r.wordsOnly ? r.figure : <CountUpFigure value={r.figure} />}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="kp-res-desc">{r.description}</p>
                <Disclaimer inline />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
