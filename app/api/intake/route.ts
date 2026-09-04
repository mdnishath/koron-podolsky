import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

interface IntakePayload {
  source?: string;
  track?: string | null;
  answers?: { label: string; value: string }[];
  contact?: { name?: string; phone?: string; email?: string; when?: string; story?: string; message?: string; track?: string };
}

const clean = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Receives the guided-assessment and contact-form submissions.
 *
 * Delivery: if RESEND_API_KEY and INTAKE_TO_EMAIL are set in the environment,
 * the request is emailed to the firm via Resend. Otherwise it is logged on the
 * server so the site works end-to-end before the firm's inbox is connected.
 */
export async function POST(req: Request) {
  let body: IntakePayload;
  try {
    body = (await req.json()) as IntakePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const contact = body.contact ?? {};
  const name = clean(contact.name, 200);
  const phone = clean(contact.phone, 60);
  const email = clean(contact.email, 200);
  const reachable = phone.length > 5 || email.includes("@");
  if (name.length < 2 || !reachable) {
    return NextResponse.json({ ok: false, error: "A name and a phone number or email are required." }, { status: 422 });
  }

  const lines: string[] = [
    `Source: ${clean(body.source, 80) || "website"}`,
    `Practice: ${clean(body.track ?? contact.track, 80) || "not specified"}`,
    "",
    `Name: ${name}`,
    `Phone: ${phone || "—"}`,
    `Email: ${email || "—"}`,
    `Best time: ${clean(contact.when, 80) || "—"}`,
    "",
  ];
  if (body.answers?.length) {
    lines.push("Assessment answers:");
    body.answers.slice(0, 20).forEach((a) => lines.push(`  • ${clean(a.label, 80)}: ${clean(a.value, 200)}`));
    lines.push("");
  }
  const story = clean(contact.story ?? contact.message);
  if (story) lines.push("In their words:", story, "");
  lines.push(`Received: ${new Date().toISOString()}`);
  const text = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_TO_EMAIL;
  const from = process.env.INTAKE_FROM_EMAIL || `${SITE.shortName} Website <onboarding@resend.dev>`;

  if (apiKey && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()),
          reply_to: email || undefined,
          subject: `New consultation request — ${name}`,
          text,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error("[intake] email delivery failed", err);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.log("[intake] new request (email delivery not configured)\n" + text);
  }

  return NextResponse.json({ ok: true });
}
