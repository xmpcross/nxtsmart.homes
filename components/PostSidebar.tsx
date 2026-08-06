import Link from 'next/link';
import { coverImageSrc, type NxtSmartPost } from '@/lib/strapi';
import { fmtDate, firstImageUrl, postPath } from '@/lib/format';
import { SECTIONS, SITE } from '@/lib/site';
import FeaturedPostsCarousel, { type FeaturedPost } from './FeaturedPostsCarousel';

/**
 * Post sidebar — the right column of the single-post layout.
 *
 * Mirrors the reference theme's widget stack: an About card for the author,
 * a Featured posts list, a newsletter card, then category navigation. Every
 * widget is a white card with an 11px uppercase label, so the column reads as
 * one system whatever the post.
 */

const EDITORIAL = SECTIONS.filter((s) =>
  ['product-comparisons', 'product-reviews', 'how-to-guides', 'top-rated', 'informative-articles'].includes(s.slug),
);
const SMART_HOME = SECTIONS.filter((s) => s.slug.startsWith('smart-home-'));

// ── Primitives ──────────────────────────────────────────────────────────────

function SidebarCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#e1e1e8] bg-white p-6 ${className}`}>{children}</div>
  );
}

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#696981]">{children}</h2>
  );
}

// ── About the author ────────────────────────────────────────────────────────

function AboutCard({
  author,
}: {
  author: { name: string; slug?: string; bio?: string; role?: string };
}) {
  const initial = author.name.slice(0, 1).toUpperCase();

  // No border — a soft violet lift instead, the reference theme's card shadow
  // (0 5px 20px rgba(--cs-color-box-shadow-rgb, .12), where that token is
  // 114,114,255).
  return (
    <SidebarCard className="border-0 shadow-[0_5px_20px_0_rgba(114,114,255,0.12)]">
      <SidebarHeading>About</SidebarHeading>

      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5955d1] text-lg font-bold text-white">
          {initial}
        </span>
        <span className="min-w-0">
          <Link
            href={`/author/${author.slug ?? 'kspellman'}`}
            className="block text-[17px] font-bold leading-tight text-[#29294b] transition hover:text-[#5955d1]"
          >
            {author.name}
          </Link>
          {author.role && (
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#696981]">
              {author.role}
            </span>
          )}
        </span>
      </div>

      {author.bio && (
        <p className="mt-4 text-[15px] leading-[1.6] text-[#696981]">{author.bio}</p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <a
          href={SITE.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X / Twitter"
          className="text-[#29294b] transition hover:text-[#5955d1]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={SITE.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-[#29294b] transition hover:text-[#5955d1]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>
    </SidebarCard>
  );
}

// ── Featured posts ─────────────────────────────────────────────────────────

function featuredItems(posts: NxtSmartPost[], fallbackAuthor: string): FeaturedPost[] {
  return posts.map((p) => ({
    id: p.id,
    href: postPath(p),
    title: p.title,
    image: coverImageSrc(p) ?? firstImageUrl(p.content) ?? null,
    category: p.categories?.[0]?.name,
    author: p.author?.name ?? fallbackAuthor,
    date: fmtDate(p.publishedAt),
  }));
}

// ── Newsletter ──────────────────────────────────────────────────────────────

function NewsletterWidget() {
  return (
    <div className="rounded-2xl bg-[#29294b] p-6 text-white">
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a5a3f0]">Newsletter</h2>
      <p className="text-[14px] leading-[1.6] text-[#b8b8d0]">
        Get the latest smart home guides and reviews — no spam, ever.
      </p>
      <form action="/contact" method="get" className="mt-4 space-y-2">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          aria-label="Email address"
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-[14px] text-white placeholder:text-white/40 outline-none transition focus:border-[#5955d1] focus:bg-white/15"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-[#5955d1] py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#4a47c4]"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

// ── Category navigation ─────────────────────────────────────────────────────

function CategoryNav({ title, sections }: { title: string; sections: typeof SECTIONS }) {
  return (
    <SidebarCard>
      <SidebarHeading>{title}</SidebarHeading>
      <ul className="-mx-2 space-y-0.5">
        {sections.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}`}
              className="flex items-center justify-between rounded-lg px-2 py-2 text-[14px] text-[#29294b] transition hover:bg-[#f4f3ff] hover:text-[#5955d1]"
            >
              <span>{s.short}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-[#c9c9d6]">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function PostSidebar({
  recent,
  author,
}: {
  recent: NxtSmartPost[];
  author?: { name: string; slug?: string; bio?: string; role?: string };
}) {
  const authorData = author ?? { name: 'NXTSmart Editors' };

  return (
    <aside className="space-y-8" data-testid="post-sidebar">
      <AboutCard author={authorData} />
      <FeaturedPostsCarousel posts={featuredItems(recent, authorData.name)} />
      <NewsletterWidget />
      <CategoryNav title="Editorial" sections={EDITORIAL} />
      <CategoryNav title="Smart Home" sections={SMART_HOME} />
    </aside>
  );
}
