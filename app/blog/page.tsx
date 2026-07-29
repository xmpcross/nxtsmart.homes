import Link from 'next/link';
import type { Metadata } from 'next';
import { listPosts, type NxtSmartPost } from '@/lib/strapi';
import { SECTIONS, SITE } from '@/lib/site';
import { primaryCategorySlug } from '@/lib/format';
import PostCard from '@/components/PostCard';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog',
  description: `Every article on ${SITE.name}, organised by category — comparisons, reviews, how-to guides and more.`,
  alternates: { canonical: '/blog' },
};

async function listEveryPost(): Promise<NxtSmartPost[]> {
  const posts: NxtSmartPost[] = [];
  for (let page = 1; page <= 10; page++) {
    const res = await listPosts({ page, pageSize: 100 }).catch(() => null);
    if (!res) break;
    posts.push(...res.data);
    if (page >= (res.meta?.pagination?.pageCount ?? 1)) break;
  }
  return posts;
}

export default async function BlogPage() {
  const posts = await listEveryPost();

  const byCat = new Map<string, NxtSmartPost[]>();
  for (const p of posts) {
    const slug = primaryCategorySlug(p);
    if (!byCat.has(slug)) byCat.set(slug, []);
    byCat.get(slug)!.push(p);
  }

  const sections = SECTIONS.filter((s) => (byCat.get(s.slug)?.length ?? 0) > 0);

  return (
    <div data-testid="blog-page">
      <section className="border-b border-ink/8 bg-muted">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Blog</p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            All posts &amp; categories
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">
            Every article on {SITE.name} — {posts.length} posts across {sections.length} categories.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2" aria-label="Categories">
            {sections.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-ink/10 bg-surface px-4 py-1.5 text-sm font-semibold text-ink-muted transition hover:border-primary/30 hover:bg-primary-soft hover:text-primary"
              >
                {s.title} ({byCat.get(s.slug)!.length})
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        {sections.map((s) => (
          <section key={s.slug} id={s.slug} className="mb-14 scroll-mt-24 last:mb-0" data-testid={`blog-section-${s.slug}`}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{s.title}</h2>
              <Link href={`/${s.slug}`} className="shrink-0 text-sm font-semibold text-primary hover:underline">
                View category →
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {byCat.get(s.slug)!.map((p) => (
                <PostCard key={p.id} post={p} variant="tile" thumbBg="" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
