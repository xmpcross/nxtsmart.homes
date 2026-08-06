import Link from 'next/link';
import { SITE, SECTIONS } from '@/lib/site';


const aboutLinks = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['All Blog', '/blog'],
  ['Sitemap', '/sitemap'],
  ['Contact Us', '/contact'],
];

const smartHomeLinks = SECTIONS.filter((s) => s.slug.startsWith('smart-home-'));

const editorialLinks = SECTIONS.filter((s) =>
  ['how-to-guides', 'product-comparisons', 'product-reviews', 'top-rated'].includes(s.slug),
);

const editorialColumnLinks = [
  ['Product Reviews', '/product-reviews'],
  ['Product Comparisons', '/product-comparisons'],
  ['How-to Guides', '/how-to-guides'],
  ['Top-Rated Products', '/top-rated'],
  ['Informative Articles', '/informative-articles'],
];

const legalLinks = [
  ['Terms & Conditions', '/legal/terms'],
  ['Privacy Policy', '/legal/privacy'],
  ['Cookie Information', '/legal/cookies'],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate mt-auto overflow-hidden border-t border-ink/8 bg-[#fbfbf8] text-ink" data-testid="site-footer">
      <div className="pointer-events-none absolute inset-[-18%] z-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.16)_1px,transparent_1.8px)] bg-[length:22px_22px] opacity-70 [animation:footer-dot-drift_18s_linear_infinite]" aria-hidden />
      <div className="pointer-events-none absolute inset-[-12%] z-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.09)_1px,transparent_2px)] bg-[length:44px_44px] opacity-55 [animation:footer-dot-float_26s_ease-in-out_infinite]" aria-hidden />
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-20 sm:px-6 lg:pt-24">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.55fr_1fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-baseline text-[20px] font-bold text-ink transition hover:text-primary">
                {SITE.name}<span className="ml-1 text-xs align-super text-ink-muted">TM</span>
              </Link>
              <p className="mt-7 text-base font-medium leading-7 text-ink-muted">
                {SITE.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium text-ink-muted">
                <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">Twitter</a>
                <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="transition hover:text-primary">Facebook</a>
                <Link href="/feed.xml" className="transition hover:text-primary">RSS</Link>
              </div>
            </div>

            <FooterColumn title="About Us" links={aboutLinks} />
            <FooterColumn title="Smart Home" links={smartHomeLinks.map((s) => [s.title, "/" + s.slug])} />
            <FooterColumn title="Editorial" links={editorialColumnLinks} />
            <FooterColumn title="Useful Links" links={legalLinks} />
          </div>

          <div className="mt-20 border-t border-ink/10 pt-9">
            <div className="flex flex-col gap-5 text-sm font-medium text-ink-muted sm:flex-row sm:items-center sm:justify-between">
              <p>{year} {SITE.name}. All rights reserved.</p>
              <div className="inline-flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[][] }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-6 space-y-4 text-sm font-medium text-ink-muted">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="transition hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
