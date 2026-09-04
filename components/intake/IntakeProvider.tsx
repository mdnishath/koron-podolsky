"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Assessment } from "./Assessment";

interface IntakeContextValue {
  open: boolean;
  openIntake: () => void;
  closeIntake: () => void;
}

const IntakeContext = createContext<IntakeContextValue>({ open: false, openIntake: () => {}, closeIntake: () => {} });

export const useIntake = () => useContext(IntakeContext);

export function IntakeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openIntake = useCallback(() => setOpen(true), []);
  const closeIntake = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.classList.toggle("kp-lock", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("kp-lock");
    };
  }, [open]);

  const value = useMemo(() => ({ open, openIntake, closeIntake }), [open, openIntake, closeIntake]);

  return (
    <IntakeContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="intake-modal"
            className="kp-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Guided case assessment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeIntake();
            }}
          >
            <motion.div
              className="kp-modal__panel"
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <Assessment variant="modal" onClose={closeIntake} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </IntakeContext.Provider>
  );
}
