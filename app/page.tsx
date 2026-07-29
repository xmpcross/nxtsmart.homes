import Link from 'next/link';
import { listPosts, type NxtSmartPost } from '@/lib/strapi';
import { SECTIONS, SITE } from '@/lib/site';
import { fmtDate, firstImageUrl, postPath } from '@/lib/format';
import PostCard from '@/components/PostCard';
import SectionHeader from '@/components/SectionHeader';
import CategoryIcon from '@/components/CategoryIcon';

export const revalidate = 60;

export default async function HomePage() {
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
  const roundups = bySection['top-rated'] ?? bySection['product-roundups'] ?? [];
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

      <Hero featured={latest[0]} picks={latest.slice(1, 4)} />
      <CategoryStrip />
      <SectionSets sections={SECTIONS} bySection={bySection} />
      {comparisons.length > 0 && (
        <EditorialBlock
          eyebrow="Head-to-head"
          title="Latest comparisons"
          subtitle="Side-by-side breakdowns so you can pick the right product in minutes."
          viewAll="/product-comparisons"
          posts={comparisons.slice(0, 5)}
          testId="popular-product-comparisons"
        />
      )}
      {reviews.length > 0 && (
        <EditorialBlock
          eyebrow="Hands-on"
          title="Most-read reviews"
          subtitle="What works, what doesn't, and what's worth the money."
          viewAll="/product-reviews"
          posts={reviews.slice(0, 5)}
          muted
          testId="popular-product-reviews"
        />
      )}
      {guides.length > 0 && <GuidesStrip posts={guides.slice(0, 4)} />}
      <HowWeWork />
      <NewsletterCTA />
    </div>
  );
}

function Hero({
  featured,
  picks,
}: {
  featured?: NxtSmartPost;
  picks: NxtSmartPost[];
}) {
  const featuredImg = featured ? (firstImageUrl(featured.content) ?? '') : '';
  const featuredCat = featured?.categories?.[0];

  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white" data-testid="home-hero">
      <div className="absolute inset-0 bg-mesh opacity-80" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Smart home · Honest reviews
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              Make your home smarter,{' '}
              <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                one decision at a time.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              {SITE.description}
            </p>

            <form
              action="/search"
              method="get"
              role="search"
              className="mt-8 flex h-14 max-w-lg items-center gap-2 rounded-2xl border border-white/10 bg-white/95 pl-5 pr-2 shadow-glow backdrop-blur"
              data-testid="hero-search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0 text-ink-faint" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Search products, brands, guides…"
                className="h-full w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
                aria-label="Search"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary-emphasis"
              >
                Search
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-2">
              {SECTIONS.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 transition hover:border-accent/40 hover:bg-white/10"
                >
                  {s.short}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {featured && (
              <Link
                href={postPath(featured)}
                className="group block overflow-hidden rounded-4xl border border-white/10 bg-dark-surface shadow-card-hover transition hover:border-accent/30"
              >
                <div className="relative aspect-[16/10] bg-white/5">
                  {featuredImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredImg}
                      alt={featured.title}
                      className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/30 to-accent/20" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark via-dark/80 to-transparent p-5">
                    {featuredCat && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">{featuredCat.name}</p>
                    )}
                    <p className="mt-1 line-clamp-2 font-display text-lg font-bold text-white">{featured.title}</p>
                    <p className="mt-2 text-xs text-white/55">{fmtDate(featured.publishedAt)}</p>
                  </div>
                </div>
              </Link>
            )}
            {picks.length > 0 && (
              <div className="grid gap-3">
                {picks.map((p) => (
                  <PostCard key={p.id} post={p} variant="horizontal" thumbBg="bg-white/5" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryStrip() {
  const quickLinks = [
    { slug: 'product-comparisons', label: 'Comparisons' },
    { slug: 'product-reviews', label: 'Reviews' },
    { slug: 'how-to-guides', label: 'How-to' },
    { slug: 'smart-home-security', label: 'Security' },
    { slug: 'smart-home-devices', label: 'Devices' },
    { slug: 'smart-home-energy', label: 'Energy' },
  ];

  return (
    <section className="border-b border-ink/8 bg-surface" data-testid="category-strip">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-4 sm:px-6">
        {quickLinks.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-surface px-4 py-2 text-sm font-semibold text-ink-muted transition hover:border-primary/25 hover:bg-primary-soft hover:text-primary"
          >
            <CategoryIcon slug={item.slug} className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function SectionSets({
  sections,
  bySection,
}: {
  sections: typeof SECTIONS;
  bySection: Record<string, NxtSmartPost[]>;
}) {
  return (
    <section className="bg-paper py-16 sm:py-20" data-testid="section-sets">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="Browse by topic"
          title="Everything smart home, organized."
          subtitle="Six editorial formats and six smart-home topics — pick where you want to start."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const count = bySection[s.slug]?.length ?? 0;
            const cover = bySection[s.slug]?.[0];
            const img = cover ? firstImageUrl(cover.content) : null;
            return (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-4xl border border-ink/8 bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover"
                data-testid={`set-${s.slug}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
                    <CategoryIcon slug={s.slug} className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-ink-muted">{count}+</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{s.blurb}</p>
                {img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt=""
                    className="mt-5 h-32 w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.03]"
                  />
                )}
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden>
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

function EditorialBlock({
  eyebrow,
  title,
  subtitle,
  viewAll,
  posts,
  muted = false,
  testId,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  viewAll: string;
  posts: NxtSmartPost[];
  muted?: boolean;
  testId: string;
}) {
  const [feature, ...rest] = posts;
  if (!feature) return null;

  return (
    <section className={muted ? 'bg-muted/60 py-16 sm:py-20' : 'bg-surface py-16 sm:py-20'} data-testid={testId}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} viewAll={viewAll} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <PostCard post={feature} variant="feature" thumbBg="bg-muted/50" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 4).map((p) => (
              <PostCard key={p.id} post={p} variant="compact" thumbBg="bg-muted/50" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidesStrip({ posts }: { posts: NxtSmartPost[] }) {
  return (
    <section className="bg-paper py-16 sm:py-20" data-testid="popular-guides">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="How-to"
          title="Setup guides & walkthroughs"
          subtitle="Step-by-step help for getting more from your smart home gear."
          viewAll="/how-to-guides"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} variant="tile" />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  const steps = [
    {
      n: '01',
      title: 'We track real demand',
      body: 'Categories come from what people are actually shopping for — not what brands want to push.',
    },
    {
      n: '02',
      title: 'Side-by-side, fact-first',
      body: 'Specs, prices, and scores laid out clearly so you can decide in minutes.',
    },
    {
      n: '03',
      title: 'Affiliate, but transparent',
      body: "We earn when you buy through our links. Picks reflect what we'd recommend ourselves.",
    },
  ];

  return (
    <section className="bg-dark py-20 text-white" data-testid="how-we-work">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="Our process"
          title="How we choose what to recommend"
          subtitle="No paid placements. No spec-sheet shortcuts. Three steps, every time."
          dark
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-4xl border border-dark-border bg-dark-surface p-6 transition hover:border-accent/30"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 font-display text-sm font-bold text-accent">
                {s.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function NewsletterCTA() {
  return (
    <section className="bg-surface py-16 sm:py-20" data-testid="footer-cta">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
        <div className="rounded-4xl border border-ink/8 bg-gradient-to-br from-primary-soft via-surface to-accent-soft px-6 py-12 shadow-card sm:px-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Start here</p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl">
            Don't buy until you've compared.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink-muted">
            New comparisons and reviews every week. Jump into our most popular sections or search the full archive.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/product-comparisons"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-emphasis"
            >
              Latest comparisons
            </Link>
            <Link
              href="/product-reviews"
              className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-primary hover:text-primary"
            >
              Top reviews
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-primary hover:text-primary"
            >
              Search archive
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
