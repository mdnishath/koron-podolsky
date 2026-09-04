"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button, ConfidentialityNote, Disclaimer, Eyebrow, GoldRule, PhoneLink } from "@/components/ui/primitives";
import { Field, Select, StepIndicator, Textarea, TrackSelector } from "@/components/ui/forms";
import { ResultCard } from "@/components/ui/content";
import { STEP_LABELS, TIME_OPTIONS, TRACKS, TRACK_OPTIONS } from "@/lib/assessment";
import { resultsById, type Track } from "@/lib/content";

type Screen = "welcome" | "track" | "question" | "results" | "contact" | "done";

interface Contact {
  name?: string;
  phone?: string;
  email?: string;
  when?: string;
  story?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;
const screenMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.36, ease },
};

export function Assessment({ variant = "page", onClose }: { variant?: "modal" | "page"; onClose?: () => void }) {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [track, setTrack] = useState<Track | null>(null);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Contact>({});
  const [showErrors, setShowErrors] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const questions = track ? TRACKS[track].questions : [];
  const q = screen === "question" ? questions[qi] : null;
  const answer = q ? answers[q.id] : undefined;
  const chosen = q && answer ? q.options.find((o) => o.value === answer) : undefined;
  const education = chosen ? chosen.education || q?.education || "" : "";

  const stepIndex = screen === "question" ? 1 : screen === "results" ? 2 : screen === "contact" || screen === "done" ? 3 : 0;
  const totalUnits = 2 + questions.length + 1; // track + questions + results + contact
  const progressUnits =
    screen === "welcome" ? 0 : screen === "track" ? 0.5 : screen === "question" ? 1 + qi + (answer ? 0.5 : 0) : screen === "results" ? 1 + questions.length : screen === "contact" ? 2 + questions.length : totalUnits;
  const progress = Math.min(1, progressUnits / totalUnits);

  let caption = "Two minutes, four short steps";
  if (screen === "track") caption = "Step 1 of 4 — your situation";
  if (screen === "question" && track) caption = `Question ${qi + 1} of ${questions.length} — ${TRACKS[track].label}`;
  if (screen === "results") caption = "Step 3 of 4 — representative results";
  if (screen === "contact") caption = "Step 4 of 4 — how to reach you";
  if (screen === "done") caption = "Request complete";

  const matched = (() => {
    if (!track) return { results: [], exact: false };
    const issueQ = questions[0];
    const issueAnswer = issueQ ? answers[issueQ.id] : undefined;
    const issueOpt = issueQ && issueAnswer ? issueQ.options.find((o) => o.value === issueAnswer) : undefined;
    const keys = issueOpt?.results || TRACKS[track].fallback;
    const exact = !!(issueOpt && (issueOpt.results || issueOpt.exact));
    return { results: resultsById(keys), exact };
  })();

  const resultsIntro =
    matched.exact
      ? "Past matters in this area, stated exactly as the firm publishes them. They describe other people's cases, not a prediction about yours."
      : "The firm has no published result in this specific area, so these are related matters from the same practice. They describe other people's cases, not a prediction about yours.";

  const highlights = (() => {
    const list: { label: string; value: string; jump: () => void }[] = [];
    if (track) list.push({ label: "Practice", value: TRACKS[track].label, jump: () => setScreen("track") });
    questions.forEach((question, i) => {
      const a = answers[question.id];
      if (!a) return;
      const opt = question.options.find((o) => o.value === a);
      list.push({
        label: question.label,
        value: opt ? opt.label : a,
        jump: () => {
          setQi(i);
          setScreen("question");
        },
      });
    });
    return list;
  })();

  const named = (contact.name || "").trim().length > 1;
  const reachable = (contact.phone || "").trim().length > 5 || (contact.email || "").indexOf("@") > 0;

  const begin = () => setScreen("track");
  const chooseTrack = (value: Track) => {
    setTrack(value);
    setQi(0);
    setAnswers({});
    window.setTimeout(() => setScreen("question"), 260);
  };
  const pick = (qid: string, value: string) => setAnswers((prev) => ({ ...prev, [qid]: value }));
  const next = () => {
    if (screen === "question") {
      if (qi < questions.length - 1) setQi(qi + 1);
      else setScreen("results");
      return;
    }
    if (screen === "results") setScreen("contact");
  };
  const back = () => {
    if (screen === "track") return setScreen("welcome");
    if (screen === "question") return qi > 0 ? setQi(qi - 1) : setScreen("track");
    if (screen === "results") {
      setQi(Math.max(0, questions.length - 1));
      return setScreen("question");
    }
    if (screen === "contact") return setScreen("results");
  };
  const restart = () => {
    setScreen("welcome");
    setTrack(null);
    setQi(0);
    setAnswers({});
    setContact({});
    setShowErrors(false);
    setSendError(null);
  };
  const field = (key: keyof Contact) => (e: { target: { value: string } }) => setContact((c) => ({ ...c, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!named || !reachable) return setShowErrors(true);
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "guided-assessment", track, answers: highlights.map((h) => ({ label: h.label, value: h.value })), contact }),
      });
      if (!res.ok) throw new Error("Request failed");
      setShowErrors(false);
      setScreen("done");
    } catch {
      setSendError("Something went wrong sending your request. Please try again, or call the office.");
    } finally {
      setSending(false);
    }
  };

  const results = matched.results;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 4vw, 48px)" }}>
      <div className="kp-modal__head">
        <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: "min(100%, 260px)" }}>
          <Eyebrow>Guided assessment</Eyebrow>
          <p style={{ margin: 0, fontSize: "var(--kp-xs)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--kp-text-faint)" }} aria-live="polite">
            {caption}
          </p>
        </div>
        {variant === "modal" && onClose ? (
          <button type="button" onClick={onClose} aria-label="Close the assessment" className="kp-iconbtn">
            ×
          </button>
        ) : null}
      </div>

      <div className="kp-progress" aria-hidden="true">
        <div className="kp-progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {screen !== "welcome" ? <StepIndicator steps={STEP_LABELS} current={stepIndex} /> : null}

      <AnimatePresence mode="wait" initial={false}>
        {screen === "welcome" ? (
          <motion.div key="welcome" {...screenMotion} style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 36px)" }}>
            <h2 className="kp-h2" style={{ margin: 0, maxWidth: "26ch" }}>
              Tell us what happened, one <em className="kp-accent-word">question</em> at a time.
            </h2>
            <GoldRule />
            <p style={{ margin: 0, maxWidth: "56ch", fontSize: "var(--kp-lead)", lineHeight: 1.6, color: "var(--kp-text-muted)", textWrap: "pretty" }}>
              Two minutes, in your own words. You will see how the law treats situations like yours, and what the firm has handled before, before we ask for a single contact detail.
            </p>
            <div className="kp-cells kp-cells--3">
              {[
                ["Length", "About two minutes"],
                ["Privacy", "Nothing is shared or filed"],
                ["Contact details", "Asked at the end, not the start"],
              ].map(([l, v]) => (
                <div key={l} className="kp-cell" style={{ padding: "20px 22px", gap: 8 }}>
                  <span className="kp-cell__label">{l}</span>
                  <span className="kp-cell__value">{v}</span>
                </div>
              ))}
            </div>
            <div className="kp-inline-actions">
              <Button variant="primary" size="lg" withArrow onClick={begin}>
                Begin the assessment
              </Button>
              <PhoneLink tone="accent" />
            </div>
          </motion.div>
        ) : null}

        {screen === "track" ? (
          <motion.div key="track" {...screenMotion} style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 36px)" }}>
            <h2 className="kp-h3" style={{ margin: 0, maxWidth: "24ch" }}>
              Which of these is <em className="kp-accent-word">closer</em> to your situation?
            </h2>
            <TrackSelector name="kp-track" legend="Choose the track that fits your matter" options={TRACK_OPTIONS} value={track} onChange={chooseTrack} />
            <button type="button" onClick={back} className="kp-textbtn" style={{ alignSelf: "flex-start" }}>
              ← Back
            </button>
          </motion.div>
        ) : null}

        {screen === "question" && q ? (
          <motion.div key={`q-${track}-${qi}`} {...screenMotion} className="kp-asmt-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)" }}>
              <h2 className="kp-h3" style={{ margin: 0, maxWidth: "26ch" }}>
                {q.question}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {q.options.map((opt, i) => (
                  <motion.button
                    key={opt.value}
                    type="button"
                    className="kp-opt"
                    data-on={answer === opt.value ? "1" : "0"}
                    onClick={() => pick(q.id, opt.value)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease }}
                  >
                    <span className="kp-opt__dot" aria-hidden="true" />
                    <span>{opt.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="kp-inline-actions" style={{ gap: 20, marginTop: 8 }}>
                <button type="button" onClick={back} className="kp-textbtn">
                  ← Back
                </button>
                {answer ? (
                  <Button variant="primary" withArrow onClick={next}>
                    {qi < questions.length - 1 ? "Next question" : "See relevant results"}
                  </Button>
                ) : null}
              </div>
            </div>
            <AnimatePresence mode="wait">
              {education ? (
                <motion.aside key={education} className="kp-edu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.4, ease }}>
                  <Eyebrow>Did you know</Eyebrow>
                  <p style={{ margin: 0, fontSize: "var(--kp-body)", lineHeight: 1.66, color: "var(--kp-text)", textWrap: "pretty" }}>{education}</p>
                  <Disclaimer>General information about California law, not legal advice about your matter.</Disclaimer>
                </motion.aside>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}

        {screen === "results" ? (
          <motion.div key="results" {...screenMotion} style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 36px)" }}>
            <h2 className="kp-h3" style={{ margin: 0, maxWidth: "28ch" }}>
              Matters the firm has <em className="kp-accent-word">handled</em> in this area.
            </h2>
            <p style={{ margin: 0, maxWidth: "58ch", fontSize: "var(--kp-body)", lineHeight: 1.66, color: "var(--kp-text-muted)", textWrap: "pretty" }}>{resultsIntro}</p>
            <div className="kp-cells kp-cells--2">
              {results.map((r) => (
                <div key={r.id} className="kp-cell">
                  <ResultCard result={r} showDisclaimer={false} animate={false} />
                </div>
              ))}
            </div>
            <Disclaimer />
            <div className="kp-inline-actions" style={{ gap: 20 }}>
              <button type="button" onClick={back} className="kp-textbtn">
                ← Back
              </button>
              <Button variant="primary" withArrow onClick={next}>
                Continue
              </Button>
            </div>
          </motion.div>
        ) : null}

        {screen === "contact" ? (
          <motion.div key="contact" {...screenMotion} className="kp-asmt-grid">
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 28px)" }} noValidate>
              <h2 className="kp-h3" style={{ margin: 0, maxWidth: "24ch" }}>
                Where should an <em className="kp-accent-word">attorney</em> reach you?
              </h2>
              <div className="kp-two-up">
                <Field id="kp-name" label="Your name" autoComplete="name" value={contact.name || ""} onChange={field("name")} error={showErrors && !named ? "Tell us what to call you." : undefined} />
                <Field id="kp-phone" label="Phone" type="tel" autoComplete="tel" value={contact.phone || ""} onChange={field("phone")} />
              </div>
              <div className="kp-two-up">
                <Field id="kp-email" label="Email" type="email" autoComplete="email" value={contact.email || ""} onChange={field("email")} error={showErrors && !reachable ? "Add a phone number or an email so we can reply." : undefined} hint="A phone number or an email is enough." />
                <Select id="kp-when" label="Best time to reach you" placeholder="Select a time" options={TIME_OPTIONS} value={contact.when || ""} onChange={field("when")} />
              </div>
              <Textarea id="kp-story" label="Tell us what happened" rows={6} value={contact.story || ""} onChange={field("story")} hint="As much or as little as you want. There is no wrong way to start." />
              {track === "employment" ? <ConfidentialityNote /> : null}
              <Disclaimer kind="relationship" variant="boxed" />
              {sendError ? (
                <p className="kp-field__error" role="alert">
                  {sendError}
                </p>
              ) : null}
              <div className="kp-inline-actions" style={{ gap: 20 }}>
                <button type="button" onClick={back} className="kp-textbtn">
                  ← Back
                </button>
                <Button variant="primary" size="lg" type="submit" withArrow disabled={sending}>
                  {sending ? "Sending…" : "Request a Consultation"}
                </Button>
              </div>
            </form>
            <aside style={{ display: "flex", flexDirection: "column", gap: 20, padding: "clamp(22px, 2.6vw, 32px)", border: "1px solid var(--kp-hairline)", background: "var(--kp-surface)" }}>
              <Eyebrow>Conversation highlights</Eyebrow>
              <dl style={{ display: "flex", flexDirection: "column", gap: 0, margin: 0 }}>
                {highlights.map((h) => (
                  <div key={h.label} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, padding: "14px 0", borderTop: "1px solid var(--kp-hairline)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                      <dt style={{ fontSize: "var(--kp-xs)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--kp-text-faint)" }}>{h.label}</dt>
                      <dd style={{ margin: 0, fontSize: "var(--kp-sm)", lineHeight: 1.5, color: "var(--kp-text)" }}>{h.value}</dd>
                    </div>
                    <button type="button" onClick={h.jump} className="kp-textbtn" style={{ flex: "none", color: "var(--kp-accent)", fontSize: "var(--kp-xs)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Change
                    </button>
                  </div>
                ))}
              </dl>
              <p style={{ margin: 0, fontSize: "var(--kp-xs)", lineHeight: 1.6, color: "var(--kp-text-faint)" }}>This is what you have told us so far. Nothing is sent until you request the consultation.</p>
            </aside>
          </motion.div>
        ) : null}

        {screen === "done" ? (
          <motion.div key="done" {...screenMotion} style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 36px)" }}>
            <h2 className="kp-h2" style={{ margin: 0, maxWidth: "24ch" }}>
              Thank you. Your request is with <em className="kp-accent-word">us</em>.
            </h2>
            <GoldRule />
            <p style={{ margin: 0, maxWidth: "56ch", fontSize: "var(--kp-lead)", lineHeight: 1.6, color: "var(--kp-text-muted)", textWrap: "pretty" }}>
              We will review what you have sent and contact you using the details you gave us. If your matter is time-sensitive, calling is faster than waiting.
            </p>
            <PhoneLink size="lg" tone="accent" />
            <Disclaimer kind="relationship" />
            <div className="kp-inline-actions" style={{ gap: 20 }}>
              <button type="button" onClick={restart} className="kp-textbtn" style={{ alignSelf: "flex-start" }}>
                Start again
              </button>
              {variant === "modal" && onClose ? (
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
