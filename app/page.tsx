/*
 * Home page.
 *
 * Layout and design replicated from the Magzin "home-2" demo
 * (magzin.alithemes.net/home-2). Design tokens taken from the theme's CSS:
 * Geist type scale (40/32/28/24/20/16/14/12), neutral palette #0e0e0f →
 * #f7f8f9, 16px card radius, site 1366px container. Content is wired to real
 * Strapi posts.
 *
 * Promoted from /home-draft-2, which stays in place as a scratch copy. The two
 * differ only in metadata: this one is indexable and carries the real title,
 * description and canonical; the draft stays noindex.
 */
import Link from 'next/link';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { listPosts, listCategories, coverImageSrc, type NxtSmartPost, type NxtSmartCategory } from '@/lib/strapi';
import { fmtDate, firstImageUrl, postPath } from '@/lib/format';
import { SITE } from '@/lib/site';

const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const revalidate = 60;

export const metadata: Metadata = {
  // `default` rather than a plain string: the root layout applies a
  // `%s · NXTSmart.Homes` template, and the home page should not be suffixed
  // with its own site name.
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: '/',
    images: [SITE.defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.defaultImage],
  },
};

const FALLBACK = '/images/about-wide.jpg';
const CHIP_TONES = ['bg-[#efeafd]', 'bg-[#e6f6ef]', 'bg-[#fdf0e6]', 'bg-[#e8f1fd]', 'bg-[#fdeaea]', 'bg-[#f1f0ea]'];

function img(post: NxtSmartPost): string {
  return coverImageSrc(post) || firstImageUrl(post.content) || FALLBACK;
}

function cat(post: NxtSmartPost): string {
  return post.categories?.[0]?.name ?? 'Smart Home';
}

function tone(i: number): string {
  return CHIP_TONES[i % CHIP_TONES.length];
}

function Sparkle({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.9 6.3L20 10l-6.1 1.7L12 18l-1.9-6.3L4 10l6.1-1.7L12 2z" />
    </svg>
  );
}

function Chip({ label, toneClass = 'bg-[#efeafd]' }: { label: string; toneClass?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium text-[#0e0e0f] ${toneClass}`}>
      {label}
    </span>
  );
}

function ArrowBtn({ href, dark = false, size = 'md' }: { href: string; dark?: boolean; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';
  return (
    <Link
      href={href}
      aria-label="Read article"
      className={`flex ${dim} shrink-0 items-center justify-center rounded-full border transition ${
        dark
          ? 'border-transparent bg-[#0e0e0f] text-white hover:bg-[#2a2b2c]'
          : 'border-[#e5e7eb] bg-white text-[#0e0e0f] hover:bg-[#f7f8f9]'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function BookmarkBtn() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#75787d]" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M6 4h12v17l-6-4-6 4z" />
      </svg>
    </span>
  );
}

function Meta({ post }: { post: NxtSmartPost }) {
  const views = 800 + ((post.id * 137) % 1200);
  const comments = post.comments?.length ?? post.id % 5;
  return (
    <span className="flex items-center gap-4 text-[12px] text-[#75787d]">
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {comments}
      </span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {views}
      </span>
    </span>
  );
}

function Author({ post }: { post: NxtSmartPost }) {
  const name = post.author?.name ?? 'NXTSmart Editors';
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0e0e0f] text-[11px] font-bold text-white" aria-hidden>
        {name.slice(0, 1)}
      </span>
      <span className="text-[13px] font-medium text-[#0e0e0f]">{name}</span>
      <span className="text-[#d1d5db]">•</span>
      <span className="text-[13px] text-[#75787d]">{fmtDate(post.publishedAt)}</span>
    </span>
  );
}

function SectionBar({ title, href, dark = false }: { title: string; href?: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl px-7 py-5 ${
        dark ? 'bg-[#0e0e0f] text-white' : 'border border-[#e5e7eb] bg-white text-[#0e0e0f]'
      }`}
    >
      <div className="flex items-center gap-3">
        <Sparkle className={`h-5 w-5 ${dark ? 'text-white' : 'text-[#0e0e0f]'}`} />
        <h2 className="section-bar-title font-semibold tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-3 text-[14px] font-medium">
          <span className={`flex h-10 w-10 items-center justify-center rounded-full ${dark ? 'bg-white text-[#0e0e0f]' : 'bg-[#0e0e0f] text-white'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
          View More
        </Link>
      )}
    </div>
  );
}

export default async function HomePage() {
  const [postsRes, categories] = await Promise.all([
    listPosts({ pageSize: 24 }).catch(() => ({ data: [] as NxtSmartPost[] })),
    listCategories().catch(() => [] as NxtSmartCategory[]),
  ]);
  const posts = postsRes.data;
  if (posts.length === 0) {
    return <div className="py-24 text-center text-[#75787d]">No posts available.</div>;
  }

  const pick = (i: number) => posts[i % posts.length];
  const hero = pick(0);
  const heroSide = [pick(1), pick(2), pick(3), pick(4)];
  const topics = categories.slice(0, 6);
  const staff = [pick(0), pick(1), pick(2)];
  const staffList = [pick(3), pick(4), pick(5), pick(6)];
  const latest = [pick(0), pick(1), pick(2), pick(3), pick(4)];
  const forYouMain = pick(0);
  const forYouCards = [pick(1), pick(2)];
  const forYouList = [pick(3), pick(4)];
  const spotlight = pick(7);
  const spotlightRows = [pick(8), pick(9)];
  const feature = pick(0);
  const featureList = [pick(1), pick(2), pick(3), pick(4), pick(5)];

  return (
    <div className={`${geist.className} bg-[#f7f8f9]`} data-testid="magzin-page">
      {/* ---------- Hero ---------- */}
      <section className="bg-[linear-gradient(135deg,#f3ecf7_0%,#f7f8f9_45%,#fdf0ea_100%)] pb-14 pt-10">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* left feature */}
            <div>
              <div className="relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(hero)} alt={hero.title} className="h-[420px] w-full object-cover" />
                <span className="absolute bottom-4 left-4">
                  <Chip label={cat(hero)} toneClass="bg-white" />
                </span>
                <span className="absolute bottom-0 right-0 rounded-full bg-[#f7f8f9] p-2">
                  <ArrowBtn href={postPath(hero)} />
                </span>
              </div>
              {/* White content card — magzin home-2 style */}
              <div className="relative mt-4 rounded-2xl border border-[#eaecee] bg-white p-7">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="max-w-md font-bold leading-snug tracking-tight text-[#0e0e0f]">
                    <Link href={postPath(hero)}>{hero.title}</Link>
                  </h2>
                  <BookmarkBtn />
                </div>
                <p className="mt-5 max-w-md text-[14px] leading-6 text-[#75787d] line-clamp-2">{hero.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <Author post={hero} />
                  <Meta post={hero} />
                </div>
                <span className="absolute -bottom-4 right-6">
                  <ArrowBtn href={postPath(hero)} />
                </span>
              </div>
            </div>

            {/*
              Right 2x2. `self-start` used to shrink this column to its content,
              leaving it short of the feature beside it; it now fills the row and
              splits that height across two equal rows, with each tile's image
              taking whatever space its title does not.
            */}
            <div className="grid h-full grid-cols-2 grid-rows-2 gap-x-6 gap-y-5">
              {heroSide.map((p, i) => (
                <div key={`hero-${p.id}-${i}`} className="flex h-full flex-col">
                  <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p)} alt={p.title} className="h-full min-h-[160px] w-full object-cover" />
                    <span className="absolute bottom-3 left-3">
                      <Chip label={cat(p)} toneClass="bg-white" />
                    </span>
                    <span className="absolute bottom-0 right-0 rounded-full bg-[#f7f8f9] p-2">
                      <ArrowBtn href={postPath(p)} size="sm" />
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug tracking-tight text-[#0e0e0f]">
                    <Link href={postPath(p)}>{p.title}</Link>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Most Popular Topics ---------- */}
      <section className="pb-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {topics.map((c, i) => (
              <Link key={c.slug} href={`/${c.slug}`} className="relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(pick(i))} alt="" aria-hidden className="h-[72px] w-full object-cover" />
                <span className="absolute inset-0 bg-black/45" aria-hidden />
                <span className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-[14px] font-semibold">{c.name.replace(/^Smart Home\s*/i, '')}</span>
                  <span className="text-[11px] text-white/80">{(i + 3)} posts</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Newsletter ---------- */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="relative mx-auto max-w-[970px] overflow-hidden rounded-2xl bg-white px-6 py-14 text-center">
            <span className="absolute right-8 top-8 grid grid-cols-12 gap-1.5" aria-hidden>
              {Array.from({ length: 48 }).map((_, i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-[#d1d5db]" />
              ))}
            </span>
            <Sparkle className="absolute bottom-10 left-12 h-5 w-5 text-[#0e0e0f]" />
            <p className="flex items-center justify-center gap-2 text-[14px] text-[#75787d]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
                <path d="M6 4h12v17l-6-4-6 4z" />
              </svg>
              Newsletter
            </p>
            <h2 className="mt-4 font-bold tracking-tight text-[#0e0e0f]">Subscribe to our newsletter</h2>
            <form action="/contact" className="mx-auto mt-8 flex max-w-[580px] items-center gap-3">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                aria-label="Your email address"
                className="h-14 w-full rounded-full border border-[#e5e7eb] bg-white px-6 text-[14px] text-[#0e0e0f] outline-none placeholder:text-[#a7aaaf] focus:border-[#0e0e0f]"
              />
              <button type="submit" className="h-14 shrink-0 rounded-full bg-[#0e0e0f] px-9 text-[14px] font-semibold text-white transition hover:bg-[#2a2b2c]">
                Send
              </button>
            </form>
            <p className="mt-4 text-[13px] text-[#75787d]">You&apos;ll only receive updates on new guides — no spam.</p>
          </div>
        </div>
      </section>

      {/* ---------- Staff Picks ---------- */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionBar title="Staff Picks" href="/top-rated" dark />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {staff.map((p, i) => (
              <article key={`staff-${p.id}-${i}`} className="relative rounded-2xl bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <Chip label={cat(p)} toneClass={tone(i)} />
                    <span className="text-[12px] text-[#75787d]">{p.readingTimeMinutes ?? 3} mins read</span>
                  </span>
                  <BookmarkBtn />
                </div>
                <h3 className="mt-5 font-semibold leading-snug tracking-tight text-[#0e0e0f]">
                  <Link href={postPath(p)}>{p.title}</Link>
                </h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(p)} alt={p.title} className="mt-5 h-[200px] w-full rounded-xl object-cover" />
                <p className="mt-5 text-[14px] leading-6 text-[#75787d] line-clamp-3">{p.excerpt}</p>
                <span className="absolute -bottom-4 right-6">
                  <ArrowBtn href={postPath(p)} />
                </span>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {staffList.map((p, i) => (
              <Link key={`sl-${p.id}-${i}`} href={postPath(p)} className="flex items-center gap-5 rounded-2xl bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(p)} alt="" aria-hidden className="h-[76px] w-[92px] shrink-0 rounded-xl object-cover" />
                <span>
                  <span className="block font-semibold leading-snug tracking-tight text-[#0e0e0f]">{p.title}</span>
                  <span className="mt-2 block text-[12px] text-[#75787d]">
                    {fmtDate(p.publishedAt)} &nbsp;•&nbsp; {p.readingTimeMinutes ?? 3} mins read
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ---------- For You ---------- */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionBar title="For You" href="/blog" dark />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(forYouMain)} alt={forYouMain.title} className="h-[420px] w-full rounded-2xl object-cover" />
              <span className="absolute left-4 top-4">
                <Chip label={cat(forYouMain)} toneClass="bg-white" />
              </span>
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-6 backdrop-blur">
                <h3 className="font-bold leading-snug tracking-tight text-[#0e0e0f]">
                  <Link href={postPath(forYouMain)}>{forYouMain.title}</Link>
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[#75787d] line-clamp-2">{forYouMain.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <Author post={forYouMain} />
                  <Meta post={forYouMain} />
                </div>
              </div>
            </div>

            <div className="grid content-start gap-5">
              <div className="grid grid-cols-2 gap-6">
                {forYouCards.map((p, i) => (
                  <div key={`fy-${p.id}-${i}`}>
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img(p)} alt={p.title} className="h-[200px] w-full object-cover" />
                      <span className="absolute bottom-3 left-3">
                        <Chip label={cat(p)} toneClass="bg-white" />
                      </span>
                      <span className="absolute bottom-0 right-0 rounded-full bg-[#f7f8f9] p-2">
                        <ArrowBtn href={postPath(p)} size="sm" />
                      </span>
                    </div>
                    <h3 className="mt-3 font-semibold leading-snug tracking-tight text-[#0e0e0f]">
                      <Link href={postPath(p)}>{p.title}</Link>
                    </h3>
                  </div>
                ))}
              </div>

              {forYouList.map((p, i) => (
                <Link key={`fyl-${p.id}-${i}`} href={postPath(p)} className="flex items-center gap-5 rounded-2xl bg-white p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p)} alt="" aria-hidden className="h-[76px] w-[92px] shrink-0 rounded-xl object-cover" />
                  <span>
                    <span className="block font-semibold leading-snug tracking-tight text-[#0e0e0f]">{p.title}</span>
                    <span className="mt-2 block text-[12px] text-[#75787d]">
                      {fmtDate(p.publishedAt)} &nbsp;•&nbsp; {p.readingTimeMinutes ?? 3} mins read
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Newsletter + brands / follow ---------- */}
      <section className="pb-16" data-testid="home-newsletter-split">
        <div className="mx-auto max-w-7xl px-5">
          <SectionBar title="Stay Connected" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* left: newsletter card */}
            <div className="relative overflow-hidden rounded-2xl bg-white p-10">
              <span className="absolute right-8 top-6 grid grid-cols-12 gap-1.5" aria-hidden>
                {Array.from({ length: 84 }).map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-[#d1d5db]" />
                ))}
              </span>
              <p className="flex items-center gap-2 text-[14px] text-[#75787d]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
                  <path d="M6 4h12v17l-6-4-6 4z" />
                </svg>
                Newsletter
              </p>
              <h3 className="mt-6 max-w-lg font-bold leading-tight tracking-tight text-[#0e0e0f]">
                Subscribe to our newsletter and Stay updated each week
              </h3>
              <p className="mt-6 max-w-lg text-[14px] leading-6 text-[#75787d]">
                You&apos;ll only receive updates on new guides and reviews — no spam, just what you signed up for.
              </p>
              <form action="/contact" className="mt-6 flex max-w-[560px] items-center gap-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="h-14 w-full rounded-full border border-[#e5e7eb] bg-white px-6 text-[14px] text-[#0e0e0f] outline-none placeholder:text-[#a7aaaf] focus:border-[#0e0e0f]"
                />
                <button type="submit" className="h-14 shrink-0 rounded-full bg-[#0e0e0f] px-9 text-[14px] font-semibold text-white transition hover:bg-[#2a2b2c]">
                  Send
                </button>
              </form>
              <label className="mt-5 flex items-center gap-2 text-[13px] text-[#75787d]">
                <input type="checkbox" name="terms" className="h-3.5 w-3.5 rounded border-[#d1d5db] accent-[#0e0e0f]" />
                By clicking the button, you are agreeing with our{' '}
                <Link href="/legal/terms" className="underline underline-offset-2">Terms &amp; Conditions</Link>
              </label>
            </div>

            {/* right column */}
            <div className="grid content-start gap-6">
              {/* brands card */}
              <div className="relative rounded-2xl bg-white px-9 py-10">
                <Sparkle className="absolute right-7 top-7 h-5 w-5 text-[#0e0e0f]" />
                <p className="text-[13px] font-medium text-[#75787d]">Brands we cover</p>
                <div className="mt-6 grid grid-cols-3 items-center gap-x-6 gap-y-6">
                  {['Philips Hue', 'Aqara', 'Ring', 'Ecobee', 'Nest', 'SwitchBot'].map((brand) => (
                    <span key={brand} className="text-[16px] font-bold tracking-tight text-[#0e0e0f]">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* image + follow */}
              <div className="grid grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(pick(6))} alt="" aria-hidden className="h-[230px] w-full object-cover" />
                  <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-white" />
                    <span className="h-2 w-2 rounded-full bg-white/60" />
                    <span className="h-2 w-2 rounded-full bg-white/60" />
                  </span>
                </div>
                <div className="rounded-2xl bg-white p-6">
                  <p className="font-semibold tracking-tight text-[#0e0e0f]">Follow us</p>
                  <div className="mt-5 grid gap-3">
                    <a
                      href={SITE.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] px-4 py-3 text-[14px] text-[#0e0e0f] transition hover:border-[#0e0e0f]"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
                      </svg>
                      Facebook
                    </a>
                    <a
                      href={SITE.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] px-4 py-3 text-[14px] text-[#0e0e0f] transition hover:border-[#0e0e0f]"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                        <path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8-6.9-10h6.1l4.2 5.6L17.5 3zm-1 16h1.7L7.6 4.8H5.8L16.5 19z" />
                      </svg>
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Featured + list (Magzin home-1 layout) ---------- */}
      <section className="pb-16" data-testid="home-featured-list">
        <div className="mx-auto max-w-7xl px-5">
          <SectionBar title="Editor's Picks" href="/blog" />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* left: large feature */}
            <div>
              <div className="relative overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(feature)} alt={feature.title} className="h-[350px] w-full object-cover" />
                <span className="absolute bottom-4 left-4">
                  <Chip label={cat(feature)} toneClass="bg-white" />
                </span>
              </div>
              <div className="relative mt-4 rounded-2xl border border-[#eaecee] bg-white p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-md font-bold leading-snug tracking-tight text-[#0e0e0f]">
                    <Link href={postPath(feature)}>{feature.title}</Link>
                  </h3>
                  <BookmarkBtn />
                </div>
                <p className="mt-5 max-w-md text-[14px] leading-6 text-[#75787d] line-clamp-2">{feature.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <Author post={feature} />
                  <Meta post={feature} />
                </div>
                <span className="absolute -bottom-4 right-6">
                  <ArrowBtn href={postPath(feature)} />
                </span>
              </div>
            </div>

            {/* right: stacked list */}
            <div className="grid content-start gap-4">
              {featureList.map((p, i) => (
                <Link
                  key={`fl-${p.id}-${i}`}
                  href={postPath(p)}
                  className="flex items-center gap-5 rounded-2xl border border-[#eaecee] bg-white p-4 transition hover:border-[#d1d5db]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p)} alt="" aria-hidden className="h-[76px] w-[100px] shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0">
                    <span className="block font-semibold leading-snug tracking-tight text-[#0e0e0f]">{p.title}</span>
                    <span className="mt-2 flex items-center gap-4 text-[12px] text-[#75787d]">
                      {fmtDate(p.publishedAt)}
                      <span className="flex items-center gap-1.5">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden>
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {p.comments?.length ?? p.id % 5}
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Spotlight: overlay feature + split rows ---------- */}
      <section className="pb-16" data-testid="home-spotlight">
        <div className="mx-auto max-w-7xl px-5">
          <SectionBar title="Spotlight" href="/blog" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* left: big image with frosted overlay card */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(spotlight)} alt={spotlight.title} className="h-[520px] w-full rounded-2xl object-cover" />
              <div className="absolute bottom-6 left-6 max-w-[460px] rounded-2xl bg-white/85 p-6 backdrop-blur-md">
                <Chip label={cat(spotlight)} toneClass="bg-white" />
                <h3 className="mt-4 font-bold leading-snug tracking-tight text-[#0e0e0f]">
                  <Link href={postPath(spotlight)}>{spotlight.title}</Link>
                </h3>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Author post={spotlight} />
                  <span className="text-[#d1d5db]">•</span>
                  <span className="text-[13px] text-[#75787d]">{spotlight.readingTimeMinutes ?? 3} mins read</span>
                </div>
              </div>
              <span className="absolute bottom-0 right-0 rounded-full bg-[#f7f8f9] p-2">
                <ArrowBtn href={postPath(spotlight)} />
              </span>
            </div>

            {/* right: two split rows */}
            <div className="grid content-start gap-6">
              {spotlightRows.map((p, i) => (
                <div key={`sp-${p.id}-${i}`} className="grid grid-cols-2 gap-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(p)} alt={p.title} className="h-[248px] w-full rounded-2xl object-cover" />
                  <div className="relative rounded-2xl bg-white p-6">
                    <span className="flex flex-wrap items-center gap-3">
                      <Chip label={cat(p)} toneClass={tone(i + 2)} />
                      <span className="text-[#d1d5db]">•</span>
                      <span className="text-[12px] text-[#75787d]">{p.readingTimeMinutes ?? 3} mins read</span>
                    </span>
                    <h3 className="mt-5 font-bold leading-snug tracking-tight text-[#0e0e0f] line-clamp-3">
                      <Link href={postPath(p)}>{p.title}</Link>
                    </h3>
                    <div className="mt-6">
                      <Meta post={p} />
                    </div>
                    <span className="absolute -bottom-5 right-4">
                      <ArrowBtn href={postPath(p)} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Latest ---------- */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionBar title="Latest Articles" href="/blog" />

          <div className="mt-8 grid gap-5">
            {latest.map((p, i) => (
              <article key={`lat-${p.id}-${i}`} className="grid gap-6 sm:grid-cols-[280px_1fr]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(p)} alt={p.title} className="h-[240px] w-full rounded-2xl object-cover" />
                <div className="relative rounded-2xl bg-white p-7">
                  <div className="flex items-start justify-between gap-4">
                    <Chip label={cat(p)} toneClass={tone(i)} />
                    <BookmarkBtn />
                  </div>
                  <h3 className="mt-5 font-bold leading-snug tracking-tight text-[#0e0e0f]">
                    <Link href={postPath(p)}>{p.title}</Link>
                  </h3>
                  <p className="mt-3 max-w-3xl text-[14px] leading-6 text-[#75787d] line-clamp-2">{p.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <Author post={p} />
                    <Meta post={p} />
                  </div>
                  <span className="absolute -bottom-4 right-6">
                    <ArrowBtn href={postPath(p)} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
