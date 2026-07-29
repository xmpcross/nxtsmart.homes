import Link from 'next/link';
import { coverImageSrc, type NxtSmartCategory, type NxtSmartPost } from '@/lib/strapi';
import { fmtDate, firstImageUrl, postPath } from '@/lib/format';

/**
 * Right-hand column on single post pages: category list + recent posts.
 * Presentational only — the page fetches the data.
 */
export default function PostSidebar({
  categories,
  recent,
}: {
  categories: NxtSmartCategory[];
  recent: NxtSmartPost[];
}) {
  return (
    <aside className="mt-10 space-y-8 lg:sticky lg:top-24 lg:mt-0 lg:self-start" data-testid="post-sidebar">
      {categories.length > 0 && (
        <section className="rounded-4xl border border-ink/8 bg-surface p-6 shadow-card">
          <h2 className="font-display text-lg font-bold tracking-tight text-ink">Categories</h2>
          <ul className="mt-4 space-y-1">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/${c.slug}`}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-ink-muted transition hover:bg-primary-soft hover:text-primary"
                >
                  <span>{c.name}</span>
                  <span aria-hidden className="text-ink-faint">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {recent.length > 0 && (
        <section className="rounded-4xl border border-ink/8 bg-surface p-6 shadow-card">
          <h2 className="font-display text-lg font-bold tracking-tight text-ink">Recent Posts</h2>
          <ul className="mt-4 space-y-4">
            {recent.map((p) => {
              const img = coverImageSrc(p) ?? firstImageUrl(p.content);
              return (
                <li key={p.id}>
                  <Link href={postPath(p)} className="group flex gap-3">
                    <span className="h-14 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-contain mix-blend-multiply p-1"
                          loading="lazy"
                        />
                      ) : (
                        <span className="block h-full w-full bg-gradient-to-br from-primary-soft to-primary/20" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug text-ink line-clamp-2 group-hover:text-primary">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-xs text-ink-faint">{fmtDate(p.publishedAt)}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </aside>
  );
}
