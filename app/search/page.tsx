import Link from 'next/link';
import type { Metadata } from 'next';
import { listPosts } from '@/lib/strapi';
import PostCard from '@/components/PostCard';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Search',
  alternates: { canonical: '/search' },
};

type SearchParams = { q?: string; page?: string };

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { q, page: pageRaw } = await searchParams;
  const query = (q ?? '').trim();
  const page = Math.max(1, Number(pageRaw) || 1);
  const PAGE_SIZE = 12;

  const res = query
    ? await listPosts({ q: query, page, pageSize: PAGE_SIZE }).catch(() => null)
    : null;
  const posts = res?.data ?? [];
  const total = res?.meta?.pagination?.total ?? 0;
  const pageCount = res?.meta?.pagination?.pageCount ?? 1;

  return (
    <div data-testid="search-page">
      <section className="border-b border-ink/8 bg-gradient-to-br from-primary-soft/40 via-paper to-accent-soft/30">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Search</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {query ? <>Results for &ldquo;{query}&rdquo;</> : 'Search the archive'}
          </h1>

          <form
            action="/search"
            method="get"
            className="mt-8 flex h-14 max-w-2xl items-center gap-2 rounded-2xl border border-ink/10 bg-white px-5 shadow-card transition focus-within:border-primary/30 focus-within:shadow-glow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0 text-ink-faint" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search products, brands, guides…"
              className="h-full w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
              aria-label="Search"
            />
            <button type="submit" className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-emphasis">
              Search
            </button>
          </form>

          {query && (
            <p className="mt-4 text-sm text-ink-faint">
              {total === 0 ? 'No results found' : `${total} result${total === 1 ? '' : 's'}`}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        {posts.length > 0 ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} variant="tile" />
            ))}
          </div>
        ) : query ? (
          <div className="rounded-4xl border border-dashed border-ink/15 bg-muted/40 px-6 py-20 text-center">
            <p className="font-display text-xl font-bold text-ink">No matches</p>
            <p className="mt-2 text-sm text-ink-muted">Try different keywords or browse a category from the home page.</p>
          </div>
        ) : (
          <div className="rounded-4xl border border-ink/8 bg-surface p-8 text-center shadow-card">
            <p className="text-ink-muted">Enter a search term above to find comparisons, reviews, and guides.</p>
          </div>
        )}

        {pageCount > 1 && (
          <nav className="mt-14 flex items-center justify-center gap-3 text-sm">
            {page > 1 && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}${page - 1 > 1 ? `&page=${page - 1}` : ''}`}
                className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-4 py-2.5 font-semibold text-ink transition hover:border-primary hover:text-primary"
              >
                ← Previous
              </Link>
            )}
            <span className="rounded-full bg-muted px-4 py-2 text-ink-muted">Page {page} of {pageCount}</span>
            {page < pageCount && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
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
