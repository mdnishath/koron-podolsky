"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProcessSteps } from "@/components/ui/content";
import { PROCESS, type Track } from "@/lib/content";

export function ProcessSwitch() {
  const [track, setTrack] = useState<Track>("employment");
  const t = PROCESS[track];
  return (
    <>
      <div className="kp-switch" role="group" aria-label="Choose a practice track">
        <button type="button" className="kp-switch__btn" aria-pressed={track === "employment"} onClick={() => setTrack("employment")}>
          Employment litigation
        </button>
        <button type="button" className="kp-switch__btn" aria-pressed={track === "injury"} onClick={() => setTrack("injury")}>
          Personal injury
        </button>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={track} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}>
          <p style={{ margin: 0, maxWidth: "64ch", fontSize: "var(--kp-body)", lineHeight: 1.72, color: "var(--kp-text-muted)", textWrap: "pretty" }}>{t.intro}</p>
          <div style={{ marginTop: "clamp(32px, 4vw, 48px)" }}>
            <ProcessSteps steps={t.steps.map((s) => ({ ...s }))} />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
