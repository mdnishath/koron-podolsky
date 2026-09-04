export const SITE = {
  name: "Koron & Podolsky, LLP",
  shortName: "Koron & Podolsky",
  tagline: "Trial Attorneys",
  positioning: "Powerful advocacy. Personal representation.",
  description:
    "A two-partner trial firm representing employees and injury victims across Los Angeles County — in employment litigation and personal injury.",
  phone: "818-514-1013",
  phoneHref: "tel:+18185141013",
  /* Sample intake address — confirm with the firm before launch. */
  email: "intake@koronpodolsky.com",
  address: {
    line1: "18801 Ventura Blvd., Suite 208",
    line2: "Tarzana, CA 91356",
    city: "Tarzana",
    region: "CA",
    postal: "91356",
    country: "US",
  },
  serving: "Serving Los Angeles County, including Sherman Oaks, Encino, and Woodland Hills.",
  /* Sample hours — confirm with the firm before launch. */
  hours: [
    { days: "Monday to Friday", time: "8:30 am – 6:00 pm" },
    { days: "Saturday", time: "By appointment" },
    { days: "Sunday", time: "Closed" },
  ],
  afterHours: "Urgent matters: leave a message and a partner will return the call the same day.",
  mapQuery: "18801 Ventura Blvd Suite 208, Tarzana, CA 91356",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://koron-podolsky.vercel.app",
  designer: { label: "Designed by Md Nishath", href: "https://mdnishath.com/" },
};

export const DISCLAIMERS = {
  results:
    "Prior results do not guarantee a similar outcome. Every case is different and must be evaluated on its own facts.",
  advertising:
    "This website is an advertisement for legal services. The information on this site is not legal advice.",
  relationship:
    "Contacting Koron & Podolsky, LLP does not create an attorney-client relationship. Please do not send confidential information until an attorney-client relationship has been established.",
};

export const NAV = [
  { label: "Employment Law", href: "/employment-law" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "Results", href: "/results" },
  { label: "Attorneys", href: "/attorneys" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Employment Law",
    links: [
      { label: "Wrongful termination", href: "/employment-law/wrongful-termination" },
      { label: "Discrimination", href: "/employment-law#discrimination" },
      { label: "Harassment and retaliation", href: "/employment-law#harassment" },
      { label: "Wage and hour", href: "/employment-law#wage-and-hour" },
      { label: "Contracts and severance", href: "/employment-law#contracts" },
    ],
  },
  {
    title: "Personal Injury",
    links: [
      { label: "Vehicle accidents", href: "/personal-injury#vehicle" },
      { label: "Premises liability", href: "/personal-injury#premises" },
      { label: "Medical malpractice", href: "/personal-injury#medical" },
      { label: "Product liability", href: "/personal-injury#product" },
      { label: "Wrongful death", href: "/personal-injury#wrongful-death" },
    ],
  },
  {
    title: "The Firm",
    links: [
      { label: "Boris Koron", href: "/attorneys/boris-koron" },
      { label: "Daniel J. Podolsky", href: "/attorneys/daniel-podolsky" },
      { label: "Our firm", href: "/attorneys#our-firm" },
      { label: "Representative results", href: "/results" },
      { label: "What to expect", href: "/what-to-expect" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Tell us about your case", href: "/tell-us-about-your-case" },
      { label: "Contact and directions", href: "/contact" },
      { label: "Home", href: "/" },
    ],
  },
];

export const UTILITY_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Disclaimer", href: "/terms" },
];
