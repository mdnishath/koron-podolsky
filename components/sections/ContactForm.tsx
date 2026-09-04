"use client";

import { useState, type FormEvent } from "react";
import { Button, Disclaimer, Eyebrow, TextLink } from "@/components/ui/primitives";
import { Field, Select, Textarea } from "@/components/ui/forms";

interface Form {
  name?: string;
  phone?: string;
  email?: string;
  track?: string;
  message?: string;
}

export function ContactForm() {
  const [form, setForm] = useState<Form>({});
  const [showErrors, setShowErrors] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const named = (form.name || "").trim().length > 1;
  const reachable = (form.phone || "").trim().length > 5 || (form.email || "").indexOf("@") > 0;
  const field = (key: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!named || !reachable) return setShowErrors(true);
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact-form", track: form.track, contact: form }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setError("Something went wrong sending your message. Please try again, or call the office.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="kp-form-card" noValidate>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Eyebrow>Send a message</Eyebrow>
        <p style={{ margin: 0, fontSize: "var(--kp-sm)", lineHeight: 1.6, color: "var(--kp-text-muted)" }}>For a fuller account of your matter, the guided assessment asks better questions than a form does.</p>
      </div>
      {sent ? (
        <div className="kp-notice" role="status">
          <p>Thank you. Your message is with us, and we will reply using the details you gave.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Field id="c-name" label="Your name" autoComplete="name" value={form.name || ""} onChange={field("name")} error={showErrors && !named ? "Tell us what to call you." : undefined} />
          <div className="kp-two-up">
            <Field id="c-phone" label="Phone" type="tel" autoComplete="tel" value={form.phone || ""} onChange={field("phone")} />
            <Field id="c-email" label="Email" type="email" autoComplete="email" value={form.email || ""} onChange={field("email")} error={showErrors && !reachable ? "Add a phone number or an email so we can reply." : undefined} hint="A phone number or an email is enough." />
          </div>
          <Select
            id="c-track"
            label="What is this about"
            placeholder="Select a practice area"
            options={[
              { value: "employment", label: "Employment litigation" },
              { value: "injury", label: "Personal injury" },
              { value: "other", label: "Something else" },
            ]}
            value={form.track || ""}
            onChange={field("track")}
          />
          <Textarea id="c-message" label="Your message" rows={5} value={form.message || ""} onChange={field("message")} hint="Keep it brief here. Do not include anything highly sensitive in a first message." />
          <Disclaimer kind="relationship" variant="boxed" />
          {error ? (
            <p className="kp-field__error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="kp-inline-actions" style={{ gap: 20 }}>
            <Button variant="primary" size="lg" type="submit" withArrow disabled={sending}>
              {sending ? "Sending…" : "Send Message"}
            </Button>
            <TextLink href="/tell-us-about-your-case">Use the guided assessment instead</TextLink>
          </div>
        </div>
      )}
    </form>
  );
}
