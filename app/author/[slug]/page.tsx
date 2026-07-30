import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DEFAULT_AUTHOR } from "@/lib/site";
import { listPosts, type NxtSmartPost } from "@/lib/strapi";
import { fmtDate, postPath } from "@/lib/format";
import { breadcrumbJsonLd, jsonLd, personJsonLd } from "@/lib/seo";

export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== DEFAULT_AUTHOR.slug) return { title: "Not found" };
  return {
    title: DEFAULT_AUTHOR.name,
    description: DEFAULT_AUTHOR.bio,
    alternates: { canonical: `/author/${DEFAULT_AUTHOR.slug}` },
  };
}

export default async function AuthorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (slug !== DEFAULT_AUTHOR.slug) notFound();
  const posts = await listPosts({ pageSize: 12 }).then((r) => r.data).catch(() => [] as NxtSmartPost[]);

  return (
    <main className="bg-paper text-ink" data-testid="author-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", ...personJsonLd(DEFAULT_AUTHOR) }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: DEFAULT_AUTHOR.name, url: "/author/" + DEFAULT_AUTHOR.slug }])) }} />
      <section className="border-b border-ink/8 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6">
          <nav className="mb-8 flex items-center gap-2 text-sm text-ink-faint" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-ink-muted">{DEFAULT_AUTHOR.name}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Author</p>
          <h1 className="mt-4 font-display text-[2rem] font-bold tracking-tight text-ink">{DEFAULT_AUTHOR.name}</h1>
          <p className="mt-2 text-sm font-semibold text-ink-muted">{DEFAULT_AUTHOR.role}</p>
          <p className="mt-6 text-base leading-7 text-ink-muted">{DEFAULT_AUTHOR.bio}</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Recent articles</h2>
        <div className="mt-6 divide-y divide-ink/10 rounded border border-ink/10 bg-white">
          {posts.map((post) => (
            <Link key={post.id} href={postPath(post)} className="block p-5 transition hover:bg-primary-soft/40">
              <h3 className="font-display text-lg font-bold text-ink">{post.title}</h3>
              <p className="mt-2 text-sm text-ink-faint">{fmtDate(post.publishedAt)}{post.readingTimeMinutes ? ` · ${post.readingTimeMinutes} min read` : ""}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
