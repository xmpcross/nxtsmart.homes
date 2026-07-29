import Link from 'next/link';
import { coverImageSrc, type NxtSmartPost } from '@/lib/strapi';
import { fmtDate, firstImageUrl, postPath } from '@/lib/format';

type Variant = 'feature' | 'compact' | 'tile' | 'horizontal';

export default function PostCard({
  post,
  variant = 'tile',
  thumbBg = 'bg-muted',
}: {
  post: NxtSmartPost;
  variant?: Variant;
  thumbBg?: string;
}) {
  const img = coverImageSrc(post) ?? firstImageUrl(post.content);
  const imgAlt = post.coverImage?.alternativeText || post.coverImageAlt || post.title;
  const href = postPath(post);
  const cat = post.categories?.[0];

  if (variant === 'horizontal') {
    return (
      <article className="group" data-testid={`horizontal-${post.slug}`}>
        <Link href={href} className="flex gap-4 rounded-2xl border border-ink/8 bg-surface p-3 shadow-card transition hover:border-primary/20 hover:shadow-card-hover sm:gap-5 sm:p-4">
          <div className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-28 ${thumbBg}`}>
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={imgAlt} className="h-full w-full object-contain mix-blend-multiply p-2 transition duration-500 group-hover:scale-105" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-soft to-primary/20" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            {cat && <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{cat.name}</p>}
            <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold leading-snug text-ink transition group-hover:text-primary sm:text-base">
              {post.title}
            </h3>
            <p className="mt-2 text-xs text-ink-faint">
              {fmtDate(post.publishedAt)} · {post.readingTimeMinutes ?? 5} min
            </p>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'feature') {
    return (
      <article className="group" data-testid={`feature-${post.slug}`}>
        <Link href={href} className={`relative block overflow-hidden rounded-4xl border border-ink/8 shadow-card transition hover:shadow-card-hover ${thumbBg}`}>
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img}
              alt={imgAlt}
              className="aspect-[16/10] w-full object-contain mix-blend-multiply p-8 transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary-soft via-white to-accent-soft" />
          )}
          {cat && (
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {cat.name}
            </span>
          )}
        </Link>
        <div className="mt-5">
          <Link href={href}>
            <h3 className="font-display text-2xl font-bold leading-tight text-ink transition group-hover:text-primary sm:text-3xl">
              {post.title}
            </h3>
          </Link>
          {post.excerpt && (
            <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-7 text-ink-muted sm:text-base">
              {post.excerpt}
            </p>
          )}
          <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
            <span>{fmtDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-ink-faint" aria-hidden />
            <span>{post.readingTimeMinutes ?? 5} min read</span>
          </p>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group py-4 first:pt-0 last:pb-0" data-testid={`compact-${post.slug}`}>
        <Link href={href} className="grid grid-cols-[88px_minmax(0,1fr)] gap-4">
          <div className={`overflow-hidden rounded-xl border border-ink/8 ${thumbBg}`}>
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={imgAlt}
                className="aspect-square h-full w-full object-contain mix-blend-multiply p-2 transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="aspect-square bg-gradient-to-br from-primary-soft to-primary/20" />
            )}
          </div>
          <div className="min-w-0">
            {cat && <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{cat.name}</p>}
            <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold leading-snug text-ink transition group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mt-2 text-xs text-ink-faint">
              {fmtDate(post.publishedAt)} · {post.readingTimeMinutes ?? 5} min
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col" data-testid={`tile-${post.slug}`}>
      <Link
        href={href}
        className={`relative block overflow-hidden rounded-4xl border border-ink/8 shadow-card transition hover:-translate-y-0.5 hover:border-primary/15 hover:shadow-card-hover ${thumbBg}`}
      >
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={imgAlt}
            className="aspect-[4/3] w-full object-contain mix-blend-multiply p-5 transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-gradient-to-br from-primary-soft via-white to-accent-soft" />
        )}
        {cat && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
            {cat.name}
          </span>
        )}
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <Link href={href} className="flex-1">
          <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-ink transition group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">{post.excerpt}</p>
        )}
        <p className="mt-auto pt-3 text-xs text-ink-faint">
          {fmtDate(post.publishedAt)} · {post.readingTimeMinutes ?? 5} min
        </p>
      </div>
    </article>
  );
}
