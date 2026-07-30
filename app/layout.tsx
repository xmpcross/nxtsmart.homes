import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { jsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE } from '@/lib/site';

// Fonts are self-hosted via @font-face in globals.css (public/fonts/InterVariable*.woff2).
// No next/font/google fetch — keeps the build offline-friendly and lands the
// font on our own origin so pageload makes zero requests to fonts.gstatic.com.

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: `${SITE.name} RSS` }],
    },
  },
  verification: {
    other: {
      'msvalidate.01': '057158952120360611CA2F41AD7D5B50',
      'google-adsense-account': 'ca-pub-2867376862905050',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans font-normal" data-testid="app-shell">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd()) }} />
      </body>
    </html>
  );
}
