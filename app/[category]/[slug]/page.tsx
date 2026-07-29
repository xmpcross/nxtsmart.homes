import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPost, listPosts, listCategories, mediaUrl, coverImageSrc, type NxtSmartPost } from '@/lib/strapi';
import { SECTIONS, SITE } from '@/lib/site';
import { fmtDate, primaryCategorySlug, postPath } from '@/lib/format';
import PostContent from '@/components/PostContent';
import RelatedCarousel from '@/components/RelatedCarousel';
import PostSidebar from '@/components/PostSidebar';

export const revalidate = 60;
export const dynamicParams = true;

type Params = { category: string; slug: string };

function categoryName(slug?: string): string {
  if (!slug) return '';
  return SECTIONS.find((s) => s.slug === slug)?.title ?? slug.replace(/-/g, ' ');
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, category } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) return { title: 'Not found' };

  const cover = coverImageSrc(post) || mediaUrl(post.ogImage ?? null);
  const description = post.seoDescription || post.excerpt || SITE.description;

  return {
    title: post.seoTitle || post.title,
    description,
    keywords: post.seoKeywords,
    alternates: { canonical: `/${category}/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.seoTitle || post.title,
      description,
      url: `${SITE.url}/${category}/${post.slug}`,
      images: cover ? [{ url: cover }] : undefined,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: cover ? 'summary_large_image' : 'summary',
      title: post.seoTitle || post.title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug, category } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  const canonicalCat = primaryCategorySlug(post);
  if (canonicalCat !== category) {
    const { redirect } = await import('next/navigation');
    redirect(postPath(post));
  }

  const [related, categories, recent] = await Promise.all([
    listPosts({ category, pageSize: 9 })
      .then((r) => r.data.filter((p) => p.id !== post.id).slice(0, 8))
      .catch(() => [] as NxtSmartPost[]),
    listCategories().catch(() => []),
    listPosts({ pageSize: 6 })
      .then((r) => r.data.filter((p) => p.id !== post.id).slice(0, 5))
      .catch(() => [] as NxtSmartPost[]),
  ]);

  const cover = coverImageSrc(post);
  const cat = post.categories?.[0];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': post.postType === 'product-review' ? 'Review' : 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: cover ? [cover] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: `${SITE.url}/${category}/${post.slug}`,
  };

  return (
    <article
      className="pb-16"
      data-testid={`post-${post.slug}`}
      data-category={category}
      data-post-type={post.postType}
    >
      <link rel="stylesheet" href="/vendor/cegg-bootstrap.min.css" />
      <link rel="stylesheet" href="/vendor/cegg-products.min.css" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="border-b border-ink/8 bg-muted">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-12">
            <div className="min-w-0">
              <nav className="flex items-center gap-2 text-xs text-ink-faint" data-testid="breadcrumb" aria-label="Breadcrumb">
                <Link href="/" className="shrink-0 hover:text-primary">Home</Link>
                <span className="shrink-0">/</span>
                <Link href={`/${category}`} className="shrink-0 hover:text-primary">
                  {cat?.name ?? categoryName(category)}
                </Link>
                <span className="shrink-0">/</span>
                <span className="min-w-0 truncate text-ink-muted" aria-current="page">{post.title}</span>
              </nav>

              {cat && (
                <Link
                  href={`/${category}`}
                  className="mt-6 inline-flex rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"
                >
                  {cat.name}
                </Link>
              )}
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.5rem]">
                {post.title}
              </h1>
              <p className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-faint">
                <span>Published {fmtDate(post.publishedAt)}</span>
                {post.readingTimeMinutes ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-ink-faint" aria-hidden />
                    <span>{post.readingTimeMinutes} min read</span>
                  </>
                ) : null}
              </p>
            </div>

            {cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt={post.coverImage?.alternativeText || post.title}
                className="mt-8 aspect-[16/10] w-full rounded-4xl border border-ink/8 bg-muted object-contain shadow-card lg:mt-0"
              />
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <div className="mt-10 rounded-4xl border border-ink/8 bg-surface p-6 sm:p-10 lg:p-12">
              <PostContent html={post.content} />
            </div>

            <div className="mt-8 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 text-xs leading-6 text-ink-muted">
              <strong className="text-ink">Affiliate disclosure.</strong> {SITE.name} earns a
              commission when you buy through links on this page, at no extra cost to you.
              Prices and availability are accurate as of {fmtDate(post.updatedAt)} and subject to change.
            </div>
          </div>

          <div className="hidden lg:mt-8 lg:block">
            <PostSidebar categories={categories} recent={recent} />
          </div>
        </div>

        {related.length > 0 && (
          <aside className="mt-16 border-t border-ink/8 pt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              More in {cat?.name ?? categoryName(category)}
            </h2>
            <RelatedCarousel posts={related} />
          </aside>
        )}
      </div>
    </article>
  );
}
