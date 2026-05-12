import Link from 'next/link';
import { listPosts, type NxtSmartPost } from '@/lib/strapi';
import { SECTIONS, SITE } from '@/lib/site';
import { fmtDate, firstImageUrl, postPath, primaryCategorySlug } from '@/lib/format';
import PostCard from '@/components/PostCard';

export const revalidate = 60;

export default async function HomePage() {
  // Fetch each section's recent posts in parallel
  const perSection = await Promise.all(
    SECTIONS.map((s) =>
      listPosts({ category: s.slug, pageSize: 8 })
        .then((r) => r.data)
        .catch(() => [] as NxtSmartPost[]),
    ),
  );
  const bySection: Record<string, NxtSmartPost[]> = Object.fromEntries(
    SECTIONS.map((s, i) => [s.slug, perSection[i]]),
  );

  // De-duped latest across all categories (for the hero collage)
  const latest: NxtSmartPost[] = [];
  const seen = new Set<number>();
  for (const post of perSection
    .flat()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())) {
    if (seen.has(post.id)) continue;
    seen.add(post.id);
    latest.push(post);
  }

  const comparisons = bySection['product-comparisons'] ?? [];
  const reviews = bySection['product-reviews'] ?? [];
  const roundups = bySection['product-roundups'] ?? [];
  const guides = bySection['how-to-guides'] ?? [];

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div data-testid="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <Hero latest={latest} />
      <SectionSets sections={SECTIONS} bySection={bySection} />
      {comparisons.length > 0 && <PopularBlock title="Latest Head-to-Heads" subtitle="Side-by-side product showdowns." viewAll="/product-comparisons" posts={comparisons.slice(0, 6)} />}
      {reviews.length > 0 && <PopularBlock title="Most-Read Reviews" subtitle="Hands-on takes from the team." viewAll="/product-reviews" posts={reviews.slice(0, 6)} accent />}
      {roundups.length > 0 && <RoundupsList posts={roundups.slice(0, 4)} />}
      {guides.length > 0 && <GuidesStrip posts={guides.slice(0, 8)} />}
      <HowWeWork />
      <FooterCTA />
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero({ latest }: { latest: NxtSmartPost[] }) {
  const featured = latest.slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-[#101d27] text-white" data-testid="home-hero">
      <div className="absolute inset-0 -z-0 opacity-[0.04]" aria-hidden>
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_60%)]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/90">Smart picks · Honest reviews</p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            The best gadgets,<br />
            <span className="text-primary">side&#8209;by&#8209;side.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            Comparisons, hands-on reviews and best-of roundups for the tech and smart-home gear people are actually shopping for.
          </p>
          <form
            action="/search"
            method="get"
            role="search"
            className="mt-8 flex h-14 max-w-lg items-center gap-2 rounded-full bg-white pl-6 pr-2 shadow-lg shadow-black/20"
            data-testid="hero-search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 shrink-0 text-ink/40"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              name="q"
              placeholder="Search products, brands, guides…"
              className="h-full w-full bg-transparent text-base text-ink outline-none placeholder:text-ink/45"
              aria-label="Search"
            />
            <button
              type="submit"
              className="h-10 shrink-0 rounded-full bg-primary px-5 font-display text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-emphasis"
            >
              Search
            </button>
          </form>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/55">
            <span>Browse:</span>
            {SECTIONS.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-full border border-white/15 px-3 py-1.5 text-white/85 transition hover:border-primary hover:text-white"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        {featured.length > 0 && (
          <div className="relative">
            <HeroCollage posts={featured} />
          </div>
        )}
      </div>
    </section>
  );
}

function HeroCollage({ posts }: { posts: NxtSmartPost[] }) {
  const tiles = posts.slice(0, 4);
  return (
    <div className="relative grid grid-cols-2 gap-4" data-testid="hero-collage">
      {tiles.map((p, i) => {
        const img = firstImageUrl(p.content) ?? '';
        const cat = p.categories?.[0];
        const isLarge = i === 0;
        return (
          <Link
            key={p.id}
            href={postPath(p)}
            className={`group relative overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 ${isLarge ? 'col-span-2 row-span-2 aspect-[16/10]' : 'aspect-square'}`}
          >
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={p.title}
                className="h-full w-full object-contain mix-blend-multiply p-6 transition duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-hover to-primary" />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
              {cat && <p className="text-[10px] font-bold uppercase tracking-wider text-primary/90">{cat.name}</p>}
              <p className={`mt-1 line-clamp-2 font-display font-bold text-white ${isLarge ? 'text-base' : 'text-xs'}`}>
                {p.title}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ---------- SECTION SETS — like flowers' "Flower Sets" ---------- */

function SectionSets({
  sections,
  bySection,
}: {
  sections: typeof SECTIONS;
  bySection: Record<string, NxtSmartPost[]>;
}) {
  return (
    <section className="bg-white py-16 sm:py-20" data-testid="section-sets">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Browse by type"
          title="Pick your reading."
          subtitle="Six editorial formats — from quick comparisons to deep how-tos."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const count = bySection[s.slug]?.length ?? 0;
            const cover = bySection[s.slug]?.[0];
            const img = cover ? firstImageUrl(cover.content) : null;
            return (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-muted p-6 transition hover:bg-primary-hover/40"
                data-testid={`set-${s.slug}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-ink/65">{s.blurb}</p>
                  </div>
                  <div className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">{count}+</div>
                </div>
                {img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt=""
                    className="mt-6 h-40 w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.05]"
                  />
                )}
                <span className="mt-6 inline-flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wider text-primary">
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <polyline points="13 6 19 12 13 18" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- "Popular Products" — feature + 5 grid ---------- */

function PopularBlock({
  title,
  subtitle,
  viewAll,
  posts,
  accent = false,
}: {
  title: string;
  subtitle: string;
  viewAll: string;
  posts: NxtSmartPost[];
  accent?: boolean;
}) {
  const [feature, ...rest] = posts;
  return (
    <section className={accent ? 'bg-muted py-16 sm:py-20' : 'py-16 sm:py-20'} data-testid={`popular-${primaryCategorySlug(feature)}`}>
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Editor’s pick" title={title} subtitle={subtitle} viewAll={viewAll} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <PostCard post={feature} variant="feature" thumbBg="bg-white" />
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.slice(0, 4).map((p) => (
              <PostCard key={p.id} post={p} variant="tile" thumbBg="bg-white" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ROUNDUPS — wide list ---------- */

function RoundupsList({ posts }: { posts: NxtSmartPost[] }) {
  return (
    <section className="bg-white py-16 sm:py-20" data-testid="popular-roundups">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Best of the lists"
          title="Curated roundups."
          subtitle="The shortlists worth bookmarking."
          viewAll="/product-roundups"
        />
        <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
          {posts.map((p, i) => {
            const img = firstImageUrl(p.content);
            return (
              <li key={p.id} className="group">
                <Link
                  href={postPath(p)}
                  className="grid grid-cols-[auto_120px_minmax(0,1fr)_auto] items-center gap-6 py-6"
                >
                  <span className="font-display text-2xl font-bold text-ink/30 sm:text-3xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="overflow-hidden rounded-2xl bg-muted">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt="" className="aspect-square w-full object-contain mix-blend-multiply p-3" />
                    ) : (
                      <div className="aspect-square bg-gradient-to-br from-primary-hover to-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold leading-tight text-ink transition group-hover:text-primary sm:text-xl">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm text-ink/65">{p.excerpt}</p>
                    )}
                    <p className="mt-2 text-xs text-ink/45">
                      {fmtDate(p.publishedAt)} · {p.readingTimeMinutes ?? 5} min read
                    </p>
                  </div>
                  <span className="hidden shrink-0 self-center rounded-full border border-ink/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition group-hover:border-primary group-hover:text-primary sm:inline-flex">
                    Read
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- HOW-TO STRIP ---------- */

function GuidesStrip({ posts }: { posts: NxtSmartPost[] }) {
  return (
    <section className="bg-muted py-16 sm:py-20" data-testid="popular-guides">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How to"
          title="Get the most out of your gear."
          subtitle="Walkthroughs, setup guides and troubleshooting."
          viewAll="/how-to-guides"
        />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((p) => (
            <PostCard key={p.id} post={p} variant="tile" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW WE CHOOSE — process explainer ---------- */

function HowWeWork() {
  const steps = [
    {
      n: '01',
      title: 'We track real demand',
      body: 'We pick categories from what people are actually shopping for — not what brands want to sell.',
    },
    {
      n: '02',
      title: 'Side-by-side, fact-first',
      body: 'Specs, prices, scores. The trade-offs are explicit so you can decide in minutes.',
    },
    {
      n: '03',
      title: 'Affiliate, but transparent',
      body: 'We earn a small cut when you buy through our links. Picks reflect what we’d buy ourselves.',
    },
  ];
  return (
    <section className="bg-[#101d27] py-20 text-white" data-testid="how-we-work">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title={<span className="text-white">How we choose what to recommend.</span>}
          subtitle={<span className="text-white/65">No paid placements. No reviewed-on-spec-sheet shortcuts. Three steps every time.</span>}
          dark
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="relative pl-16">
              <span className="absolute left-0 top-0 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-base font-bold text-white">
                {s.n}
              </span>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- FOOTER CTA ---------- */

function FooterCTA() {
  return (
    <section className="bg-white py-16 sm:py-20" data-testid="footer-cta">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Don’t buy until you’ve compared.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">
          New comparisons every week — start with one of our editor picks or browse the full archive.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/product-comparisons"
            className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-emphasis"
          >
            Latest comparisons
          </Link>
          <Link
            href="/product-reviews"
            className="inline-flex items-center rounded-full border border-ink/15 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink transition hover:border-primary hover:text-primary"
          >
            Top reviews
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- shared section header ---------- */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  viewAll,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  viewAll?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? 'text-primary/90' : 'text-primary'}`}>{eyebrow}</p>
        <h2 className={`mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}>
          {title}
        </h2>
        <p className={`mt-3 text-sm leading-7 sm:text-base ${dark ? 'text-white/65' : 'text-ink/65'}`}>{subtitle}</p>
      </div>
      {viewAll && (
        <Link
          href={viewAll}
          className={`inline-flex w-fit items-center gap-1 rounded-full border px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition ${dark ? 'border-white/20 text-white hover:border-primary' : 'border-ink/15 text-ink hover:border-primary hover:text-primary'}`}
        >
          See all
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="M5 12h14" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </Link>
      )}
    </div>
  );
}
