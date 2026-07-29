import Link from 'next/link';
import { SITE, SECTIONS } from '@/lib/site';

const CONTACT_EMAIL = 'hello@nxtsmart.homes';

export default function Footer() {
  const year = new Date().getFullYear();
  const editorial = SECTIONS.filter((s) =>
    ['product-comparisons', 'product-reviews', 'how-to-guides', 'top-rated', 'informative-articles'].includes(s.slug),
  );
  const topics = SECTIONS.filter((s) => s.slug.startsWith('smart-home-'));

  return (
    <footer className="mt-auto border-t border-ink/8 bg-muted text-ink" data-testid="site-footer">
      <div className="bg-mesh">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[55fr_15fr_15fr_15fr]">
            <div>
              <p className="font-display text-xl font-bold">{SITE.name}</p>
              <p className="mt-4 max-w-sm text-base font-medium leading-7 text-ink-muted">
                {SITE.description}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-6 inline-block text-sm font-semibold text-primary transition hover:text-primary-emphasis"
              >
                {CONTACT_EMAIL}
              </a>
              <div className="mt-6 flex items-center gap-3" data-testid="social-links">
                <SocialLink href={SITE.social.facebook} label="Facebook">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99h-2.5V12h2.5V9.83c0-2.47 1.47-3.84 3.73-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.76-1.61 1.55V12h2.74l-.44 2.89h-2.3v6.99A10 10 0 0 0 22 12Z" />
                </SocialLink>
                <SocialLink href={SITE.social.twitter} label="X (Twitter)">
                  <path d="M18.244 2H21.5l-7.55 8.63L22.75 22h-6.96l-5.45-7.13L4.04 22H.78l8.08-9.23L1.25 2h7.13l4.93 6.52L18.244 2Zm-1.22 18h1.93L7.06 4H5.04l11.984 16Z" />
                </SocialLink>
                <SocialLink href="/feed.xml" label="RSS feed">
                  <path d="M4 4v3a13 13 0 0 1 13 13h3A16 16 0 0 0 4 4Zm0 6v3a7 7 0 0 1 7 7h3a10 10 0 0 0-10-10Zm2.25 7.25a1.75 1.75 0 1 0 .001 3.501A1.75 1.75 0 0 0 6.25 17.25Z" />
                </SocialLink>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink-faint">About Us</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/" className="font-medium text-ink-muted transition hover:text-primary">Home</Link></li>
                <li><Link href="/about" className="font-medium text-ink-muted transition hover:text-primary">About</Link></li>
                <li><Link href="/blog" className="font-medium text-ink-muted transition hover:text-primary">Blog</Link></li>
                <li><Link href="/editorial-policy" className="font-medium text-ink-muted transition hover:text-primary">Editorial Policy</Link></li>
                <li><Link href="/sitemap" className="font-medium text-ink-muted transition hover:text-primary">Sitemap</Link></li>
                <li><Link href="/contact" className="font-medium text-ink-muted transition hover:text-primary">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink-faint">Smart Home</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {topics.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="font-medium text-ink-muted transition hover:text-primary">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink-faint">Editorial</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {editorial.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="font-medium text-ink-muted transition hover:text-primary">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/8">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-5 py-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li><Link href="/legal/terms" className="transition hover:text-primary">Terms &amp; Conditions</Link></li>
            <li><Link href="/legal/privacy" className="transition hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/legal/cookies" className="transition hover:text-primary">Cookie Information</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={`${SITE.name} on ${label}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink-muted transition hover:border-primary hover:text-primary"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
