import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { IntakeProvider } from "@/components/intake/IntakeProvider";
import { RevealObserver } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";

const display = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Trial Attorneys | Employment Law & Personal Injury, Los Angeles`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Trial Attorneys`,
    description: SITE.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The partners of Koron & Podolsky, LLP" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0706",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: "+1-818-514-1013",
  email: SITE.email,
  image: `${SITE.url}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line1,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: SITE.address.country,
  },
  areaServed: "Los Angeles County, California",
  priceRange: "Free consultation",
  founder: [
    { "@type": "Person", name: "Boris Koron", jobTitle: "Partner" },
    { "@type": "Person", name: "Daniel J. Podolsky", jobTitle: "Partner" },
  ],
  knowsAbout: ["Employment litigation", "Wrongful termination", "Whistleblower retaliation", "Wage and hour", "Personal injury", "Wrongful death"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="kp-root" data-kp-tone="dark">
          <IntakeProvider>
            <Navbar />
            <main className="kp-page">{children}</main>
            <Footer />
            <StickyCallBar />
            <RevealObserver />
          </IntakeProvider>
        </div>
      </body>
    </html>
  );
}
