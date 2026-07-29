import Link from 'next/link';
import { SITE, SECTIONS } from '@/lib/site';

const CONTACT_EMAIL = 'hello@nxtsmart.homes';

export default function Footer() {
  const year = new Date().getFullYear();
  const editorial = SECTIONS.filter((s) =>
    ['product-comparisons', 'product-reviews', 'how-to-guides', 'top-rated'].includes(s.slug),
  );
  const topics = SECTIONS.filter((s) => s.slug.startsWith('smart-home-'));

  return (
    <footer className="mt-auto bg-dark text-white" data-testid="site-footer">
      <div className="bg-mesh">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <p className="font-display text-xl font-bold">{SITE.name}</p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                {SITE.description}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-6 inline-block text-sm font-semibold text-accent transition hover:text-white"
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
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">Editorial</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {editorial.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="text-white/75 transition hover:text-accent">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">Smart Home</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {topics.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${s.slug}`} className="text-white/75 transition hover:text-accent">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/45">Company</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/about" className="text-white/75 transition hover:text-accent">About</Link></li>
                <li><Link href="/contact" className="text-white/75 transition hover:text-accent">Contact</Link></li>
                <li><Link href="/sitemap" className="text-white/75 transition hover:text-accent">Sitemap</Link></li>
                <li><Link href="/search" className="text-white/75 transition hover:text-accent">Search</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li><Link href="/legal/terms" className="transition hover:text-white">Terms</Link></li>
            <li><Link href="/legal/privacy" className="transition hover:text-white">Privacy</Link></li>
            <li><Link href="/legal/cookies" className="transition hover:text-white">Cookies</Link></li>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-accent hover:text-accent"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
