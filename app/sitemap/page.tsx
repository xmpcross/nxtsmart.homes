import Link from 'next/link';
import type { Metadata } from 'next';
import { listAllPostSlugs, listCategories, type NxtSmartCategory } from '@/lib/strapi';
import { SECTIONS, SITE } from '@/lib/site';
import { fmtDate } from '@/lib/format';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Site Map',
  description: `Browse every page on ${SITE.name} — categories, posts, about, contact and the XML feed.`,
  alternates: { canonical: '/sitemap' },
};

type PostSlug = { slug: string; category: string; updatedAt: string };

export default async function HtmlSitemapPage() {
  const [posts, cmsCats]: [PostSlug[], NxtSmartCategory[]] = await Promise.all([
    listAllPostSlugs().catch(() => [] as PostSlug[]),
    listCategories().catch(() => [] as NxtSmartCategory[]),
  ]);

  // Group posts by their primary category slug for the listing
  const byCat = new Map<string, PostSlug[]>();
  for (const p of posts) {
    if (!byCat.has(p.category)) byCat.set(p.category, []);
    byCat.get(p.category)!.push(p);
  }

  // Use config sections for stable display order; fall back to whatever else
  // came from the CMS or got tagged with an unknown slug.
  const orderedCats = [
    ...SECTIONS.map((s) => ({ slug: s.slug, name: s.title })),
    ...cmsCats
      .filter((c) => !SECTIONS.some((s) => s.slug === c.slug))
      .map((c) => ({ slug: c.slug, name: c.name })),
  ];
  const activeCats = orderedCats.filter((c) => (byCat.get(c.slug)?.length ?? 0) > 0);

  return (
    <div className="bg-paper text-ink" data-testid="sitemap-page">
      <section className="relative isolate overflow-hidden border-b border-primary/10 bg-white">
        
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <p className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">Site map</p>
          <h1 className="mt-5 font-display text-[2rem] font-bold leading-tight tracking-tight text-ink">
            Everything on {SITE.name}.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
            A human-readable index of every page — {posts.length} posts across {activeCats.length}{' '}
            categories. For machines see{' '}
            <Link href="/sitemap.xml" className="font-semibold text-primary underline-offset-2 hover:underline">
              /sitemap.xml
            </Link>
            .
          </p>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Categories">
            {activeCats.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-primary/10 bg-white/80 px-4 py-1.5 text-sm font-semibold text-ink-muted transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
              >
                {c.name} ({byCat.get(c.slug)!.length})
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        {/* Top-level pages */}
        <section className="rounded border border-primary/10 bg-surface p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Pages</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            <SiteLink href="/">Home</SiteLink>
            <SiteLink href="/about">About us</SiteLink>
            <SiteLink href="/blog">Blog</SiteLink>
            <SiteLink href="/contact">Contact us</SiteLink>
            <SiteLink href="/editorial-policy">Editorial policy</SiteLink>
            <SiteLink href="/search">Search</SiteLink>
            <SiteLink href="/feed.xml">RSS feed</SiteLink>
            <SiteLink href="/sitemap.xml">XML sitemap</SiteLink>
          </ul>
        </section>

        {/* Categories + posts */}
        <div className="mt-8 space-y-8">
          {activeCats.map(({ slug, name }) => {
            const items = byCat.get(slug)!;
            return (
              <section
                key={slug}
                id={slug}
                className="scroll-mt-24 rounded border border-primary/10 bg-surface p-6 shadow-card sm:p-8"
                data-testid={`sitemap-cat-${slug}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/${slug}`}
                    className="group inline-flex items-center gap-3 font-display text-xl font-bold tracking-tight text-ink hover:text-primary"
                  >
                    {name}
                    <span className="rounded bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-primary">
                      {items.length} {items.length === 1 ? 'post' : 'posts'}
                    </span>
                  </Link>
                  <Link href={`/${slug}`} className="text-sm font-semibold text-primary hover:underline">
                    View category →
                  </Link>
                </div>
                <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${slug}/${p.slug}`}
                        className="group flex items-baseline justify-between gap-4 rounded px-3 py-2 transition hover:bg-primary-soft"
                      >
                        <span className="truncate text-sm text-ink-muted group-hover:text-primary">
                          {humanizeSlug(p.slug)}
                        </span>
                        <span className="shrink-0 text-[11px] text-ink-faint">{fmtDate(p.updatedAt)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SiteLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="inline-flex items-center rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-sm font-semibold text-ink-muted transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
      >
        {children}
      </Link>
    </li>
  );
}

function humanizeSlug(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
