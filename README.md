# Koron & Podolsky, LLP — website

A production build of the Koron & Podolsky design in **Next.js 16 (App Router) + TypeScript**, using the firm's design system (warm ink, gold accent, Playfair Display + Inter) with scroll-reveal motion, a guided case-assessment flow, and full responsive layouts.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, practices, why the firm, attorneys, results, statement, testimonials, resources, CTA |
| `/employment-law` | Employment litigation hub (five practice areas, results, FAQ) |
| `/employment-law/wrongful-termination` | Long-form sub-practice page with process and FAQ |
| `/personal-injury` | Personal injury hub |
| `/results` | Complete published results with filter and figures |
| `/attorneys`, `/attorneys/boris-koron`, `/attorneys/daniel-podolsky` | Partner overview and bios |
| `/what-to-expect` | Process walkthrough for both tracks |
| `/contact` | Details, contact form, map |
| `/tell-us-about-your-case` | Guided assessment (also opens as a modal from every "Request a Consultation" button) |
| `/resources`, `/resources/[slug]` | Three attorney-review explainers |
| `/privacy-policy`, `/terms` | Legal pages |

`sitemap.xml`, `robots.txt`, Open Graph image, and LegalService JSON-LD are generated automatically.

## Run locally

```bash
npm install
npm run dev
```

## Form delivery

Submissions from the assessment and contact form post to `/api/intake`. Set these in Vercel (or `.env.local`) to deliver them by email through [Resend](https://resend.com); until then they are logged on the server:

```
RESEND_API_KEY=
INTAKE_TO_EMAIL=intake@koronpodolsky.com
INTAKE_FROM_EMAIL="Koron & Podolsky Website <onboarding@resend.dev>"
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Content the firm should confirm before launch

All copy lives in `lib/content.ts` and `lib/site.ts`. Items written as sample copy to fill design gaps:

- **Testimonials** (`TESTIMONIALS`) — sample quotes. Replace with client-approved quotes with written consent on file, or remove the section. Rule 7.1 notice renders automatically.
- **Office hours, intake email, parking directions** (`SITE` in `lib/site.ts`).
- **Partner personal quotes and bio paragraphs** (`ATTORNEYS[].personal`, `bio`) — written for review; nothing should publish in a partner's voice without approval.
- **Resource articles** (`ARTICLES`) — general information about California law; attorney review recommended.
- **Photography** — partner portraits are cropped from the existing group photographs. New editorial portraits at 1200 × 1500px will replace `public/img/portrait-*.jpg`.
- **Case results** are the seven published matters, stated exactly as supplied. Do not add or round.
