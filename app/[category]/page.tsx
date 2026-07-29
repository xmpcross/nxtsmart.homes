import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategory, listPosts } from '@/lib/strapi';
import { SECTIONS, SITE } from '@/lib/site';
import PostCard from '@/components/PostCard';

export const revalidate = 60;
export const dynamicParams = true;

const PAGE_SIZE = 12;
const RESERVED = new Set(['about', 'search', 'feed.xml', 'sitemap.xml', 'robots.txt']);

type Params = { category: string };
type SearchParams = { page?: string };

function isReserved(slug: string) {
  return RESERVED.has(slug);
}

async function resolveCategoryName(slug: string): Promise<string> {
  const fromCms = await getCategory(slug).catch(() => null);
  if (fromCms?.name) return fromCms.name;
  const fromConfig = SECTIONS.find((s) => s.slug === slug);
  return fromConfig?.title ?? slug.replace(/-/g, ' ');
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  if (isReserved(category)) return {};
  const name = await resolveCategoryName(category);
  return {
    title: name,
    description: `${name} from ${SITE.name} — ${SITE.tagline}`,
    alternates: { canonical: `/${category}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { category } = await params;
  if (isReserved(category)) notFound();

  const { page: pageRaw } = await searchParams;
  const page = Math.max(1, Number(pageRaw) || 1);

  const [name, res] = await Promise.all([
    resolveCategoryName(category),
    listPosts({ category, page, pageSize: PAGE_SIZE }).catch(() => null),
  ]);

  const posts = res?.data ?? [];
  const pageCount = res?.meta?.pagination?.pageCount ?? 1;
  const total = res?.meta?.pagination?.total ?? posts.length;

  if (page > 1 && posts.length === 0) notFound();

  const sectionMeta = SECTIONS.find((s) => s.slug === category);

  return (
    <div data-testid={`category-${category}`}>
      <section className="border-b border-ink/8 bg-gradient-to-br from-primary-soft/40 via-paper to-accent-soft/30">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
          <nav className="flex items-center gap-2 text-xs text-ink-faint" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-ink-muted">{name}</span>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-primary">Category</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{name}</h1>
          {sectionMeta && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted">{sectionMeta.blurb}</p>
          )}
          {total > 0 && (
            <p className="mt-4 text-sm text-ink-faint">{total} article{total === 1 ? '' : 's'}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        {posts.length === 0 ? (
          <div className="rounded-4xl border border-dashed border-ink/15 bg-muted/40 px-6 py-20 text-center">
            <p className="font-display text-xl font-bold text-ink">No posts here yet</p>
            <p className="mt-2 text-sm text-ink-muted">Check back soon — or browse another section.</p>
            <Link href="/" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-emphasis">
              Back to home
            </Link>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} variant="tile" />
            ))}
          </div>
        )}

        {pageCount > 1 && (
          <nav className="mt-14 flex items-center justify-center gap-3 text-sm" data-testid="pagination">
            {page > 1 && (
              <Link
                href={`/${category}${page - 1 > 1 ? `?page=${page - 1}` : ''}`}
                className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-4 py-2.5 font-semibold text-ink transition hover:border-primary hover:text-primary"
              >
                ← Previous
              </Link>
            )}
            <span className="rounded-full bg-muted px-4 py-2 text-ink-muted">
              Page {page} of {pageCount}
            </span>
            {page < pageCount && (
              <Link
                href={`/${category}?page=${page + 1}`}
                className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-4 py-2.5 font-semibold text-ink transition hover:border-primary hover:text-primary"
              >
                Next →
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}
