import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with the ${SITE.name} editorial team — story tips, partnership questions, corrections.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div data-testid="contact-page">
      <section className="border-b border-ink/8 bg-gradient-to-br from-primary-soft/40 via-paper to-accent-soft/30">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Contact</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
            Story tips, partnership questions, corrections, or just hello — we read everything that comes through.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Send a message</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Tell us what&apos;s on your mind
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted">
              Fill in the form and we&apos;ll get back to you by email. Please include the product, guide, or page URL if your message is about a specific article.
            </p>
            <p className="mt-6 text-sm text-ink-faint">
              Prefer email?{' '}
              <a href="mailto:hello@nxtsmart.homes" className="font-semibold text-primary hover:underline">
                hello@nxtsmart.homes
              </a>
            </p>
          </div>
          <ContactForm />
        </div>

        <div className="mx-auto mt-16 max-w-3xl px-5 text-center sm:px-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Looking for something specific?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-ink-muted">
            Browse the full archive or jump to a section.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-emphasis">
              Home
            </Link>
            <Link href="/sitemap" className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-primary hover:text-primary">
              Site map
            </Link>
            <Link href="/about" className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-primary hover:text-primary">
              About us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
