import Link from 'next/link';
import type { Metadata } from 'next';
import { listPosts, coverImageSrc, type NxtSmartPost } from '@/lib/strapi';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Home 2 — Magzin Publisher Layout | NXTSmart.Homes',
  description: 'Magzin Modern High-Performance Publisher Layout for NXTSmart.Homes',
  // A layout experiment, but a real public route once deployed. Kept out of the
  // index so it cannot compete with the actual home page for the same content —
  // which is what /home-optimus-preview already does.
  robots: { index: false, follow: false },
};

function formatDate(dateStr?: string) {
  if (!dateStr) return 'Aug 20, 2025';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getCategoryBadgeClass(categorySlug?: string) {
  switch (categorySlug) {
    case 'smart-home-automation':
    case 'automation':
      return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800';
    case 'smart-home-security':
    case 'security':
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-800';
    case 'smart-home-entertainment':
    case 'entertainment':
      return 'bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-800';
    case 'product-reviews':
    case 'reviews':
      return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800';
    default:
      return 'bg-orange-500/10 text-orange-600 border-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-800';
  }
}

export default async function MagzinHomeDraftPage() {
  const postsResponse = await listPosts({ pageSize: 15 }).catch(() => ({ data: [] }));
  const posts = postsResponse.data;

  const heroMain = posts[0] || {
    id: 1,
    title: 'Matter 1.3 & Thread Protocol: The Future of Smart Home Ecosystems',
    slug: 'matter-13-thread-protocol-guide',
    excerpt: 'Once fragmented and complex, smart home ecosystems are consolidating under Matter and Thread for instant local control and cross-brand reliability.',
    publishedAt: '2026-07-28T00:00:00.000Z',
    readingTimeMinutes: 6,
    categories: [{ id: 1, name: 'Automation', slug: 'smart-home-automation' }],
    coverImageUrl: '/images/about-wide.jpg',
  };

  const heroSecondary1 = posts[1] || {
    id: 2,
    title: 'Top 5 Smart Locks with Native Apple HomeKey & Matter Support',
    slug: 'top-smart-locks-apple-homekey',
    excerpt: 'Hands-free entry, PIN codes, and real-time activity logs tested in everyday home setups.',
    publishedAt: '2026-07-27T00:00:00.000Z',
    readingTimeMinutes: 5,
    categories: [{ id: 2, name: 'Security', slug: 'smart-home-security' }],
    coverImageUrl: '/images/about-left.jpg',
  };

  const heroSecondary2 = posts[2] || {
    id: 3,
    title: 'Smart Lighting vs. Smart Switches: Which Upgrade Is Right for You?',
    slug: 'smart-lighting-vs-smart-switches',
    excerpt: 'Compare wiring requirements, scene controls, and bulb compatibility before buying.',
    publishedAt: '2026-07-25T00:00:00.000Z',
    readingTimeMinutes: 4,
    categories: [{ id: 3, name: 'Devices', slug: 'smart-home-devices' }],
    coverImageUrl: '/images/about-right.jpg',
  };

  const trendingPosts = posts.slice(3, 8).length ? posts.slice(3, 8) : [
    { id: 4, title: 'How to Build Geofenced Home Automations Without Cloud Latency', slug: 'geofenced-automations', readingTimeMinutes: 5, categories: [{ id: 4, name: 'Automation', slug: 'automation' }] },
    { id: 5, title: 'Wi-Fi 7 Routers for Smart Homes: Does Multi-Link Operation Matter?', slug: 'wifi-7-smart-homes', readingTimeMinutes: 7, categories: [{ id: 5, name: 'Integration', slug: 'integration' }] },
    { id: 6, title: 'Energy Tracking Plugs Tested: Real Kilowatt Consumption Breakdown', slug: 'energy-tracking-plugs', readingTimeMinutes: 4, categories: [{ id: 6, name: 'Energy', slug: 'energy' }] },
    { id: 7, title: 'Smart Home Privacy Audit: Securing IP Cameras & Voice Assistants', slug: 'smart-home-privacy-audit', readingTimeMinutes: 6, categories: [{ id: 7, name: 'Security', slug: 'security' }] },
    { id: 8, title: 'Home Assistant Green Setup: Complete Beginner Walkthrough', slug: 'home-assistant-green-setup', readingTimeMinutes: 8, categories: [{ id: 8, name: 'Reviews', slug: 'reviews' }] },
  ];

  const mainFeedPosts = posts.slice(8).length ? posts.slice(8) : [
    { id: 9, title: 'Comprehensive Guide to Outdoor Smart Lighting & Zone Triggers', slug: 'outdoor-smart-lighting', excerpt: 'Transform your patio and garden with weather-resistant RGBW floodlights and radar sensors.', readingTimeMinutes: 6, publishedAt: '2026-07-24', categories: [{ id: 9, name: 'Devices', slug: 'devices' }] },
    { id: 10, title: 'Z-Wave Long Range in 2026: Extended Mesh Coverage Tested', slug: 'zwave-long-range-2026', excerpt: 'Deep-dive test of 1-mile outdoor range, battery optimization, and hub compatibility.', readingTimeMinutes: 7, publishedAt: '2026-07-23', categories: [{ id: 10, name: 'Integration', slug: 'integration' }] },
    { id: 11, title: 'Smart Thermostats Battle: Nest Learning vs. Ecobee Smart Premium', slug: 'smart-thermostats-battle', excerpt: 'Side-by-side comparison of remote room sensors, HVAC protection, and eco savings.', readingTimeMinutes: 9, publishedAt: '2026-07-22', categories: [{ id: 11, name: 'Energy', slug: 'energy' }] },
    { id: 12, title: 'Self-Hosted NVR vs. Cloud Subscriptions for Security Cameras', slug: 'nvr-vs-cloud-security', excerpt: 'Evaluate local storage cost, AI object detection, and privacy controls.', readingTimeMinutes: 5, publishedAt: '2026-07-20', categories: [{ id: 12, name: 'Security', slug: 'security' }] },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans antialiased dark:bg-[#0e0e0f] dark:text-[#f1f5f9]" data-testid="magzin-home-draft">
      {/* 1. TOP TICKER & TRENDING TOPICS BAR */}
      <div className="border-b border-slate-200/80 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-[#151d2e]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 font-bold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              TRENDING
            </span>
            <div className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
              {['⚡ Matter 1.3', '🔒 Apple HomeKey', '📱 Home Assistant', '🔋 Energy Plugs', '🔗 Thread Mesh'].map((tag) => (
                <span key={tag} className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-[11px] font-semibold text-slate-700 transition hover:border-amber-500 hover:text-amber-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium">
            <span>Friday, July 31, 2026</span>
            <span className="h-3 w-px bg-slate-200 dark:bg-slate-800" />
            <Link href="/rss" className="hover:text-amber-600 transition">RSS Feed</Link>
          </div>
        </div>
      </div>

      {/* 2. MAGZIN HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-[#0e0e0f]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-lg font-bold text-white shadow-md shadow-amber-500/20">
              NX
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                NXTSmart<span className="text-amber-500">.Homes</span>
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                High-Performance Smart Home Magazine
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700 dark:text-slate-200">
            <Link href="/home-draft" className="text-amber-500 transition">Home</Link>
            <Link href="/smart-home-automation" className="hover:text-amber-500 transition">Automation</Link>
            <Link href="/smart-home-security" className="hover:text-amber-500 transition">Security</Link>
            <Link href="/product-reviews" className="hover:text-amber-500 transition">Reviews</Link>
            <Link href="/product-comparisons" className="hover:text-amber-500 transition">Comparisons</Link>
            <Link href="/how-to-guides" className="hover:text-amber-500 transition">How-To</Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/search" className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-amber-500 hover:text-amber-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Search</span>
            </Link>

            <Link href="/contact" className="rounded-full bg-slate-900 px-5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-amber-600">
              Subscribe
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO MAGAZINE GRID (MAGZIN HOME-2 FEATURED PUBLISHER LAYOUT) */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Main Large Feature Card (Column 1 - 6 cols) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-[#151d2e] lg:col-span-6">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={coverImageSrc(heroMain as any) || '/images/about-wide.jpg'}
                alt={heroMain.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-5 top-5">
                <span className={`rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${getCategoryBadgeClass(heroMain.categories?.[0]?.slug)}`}>
                  {heroMain.categories?.[0]?.name || 'Featured'}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <Link href={`/${heroMain.categories?.[0]?.slug || 'guides'}/${heroMain.slug}`}>
                  <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-slate-900 transition hover:text-amber-500 dark:text-white sm:text-3xl">
                    {heroMain.title}
                  </h2>
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                  {heroMain.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 font-bold text-white text-xs">
                    NX
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">NXTSmart Editorial</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{formatDate(heroMain.publishedAt)} · {heroMain.readingTimeMinutes || 6} min read</p>
                  </div>
                </div>

                <Link
                  href={`/${heroMain.categories?.[0]?.slug || 'guides'}/${heroMain.slug}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition group-hover:bg-amber-500 group-hover:text-white dark:bg-slate-800 dark:text-white"
                >
                  →
                </Link>
              </div>
            </div>
          </div>

          {/* Middle Stacked Features (Column 2 - 3 cols) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-3">
            {[heroSecondary1, heroSecondary2].map((post, idx) => (
              <div key={post.id || idx} className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-[#151d2e]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={coverImageSrc(post as any) || (idx === 0 ? '/images/about-left.jpg' : '/images/about-right.jpg')}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute left-3 top-3 rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${getCategoryBadgeClass(post.categories?.[0]?.slug)}`}>
                    {post.categories?.[0]?.name || 'Guide'}
                  </span>
                </div>
                <div className="mt-4 flex-1">
                  <Link href={`/${post.categories?.[0]?.slug || 'guides'}/${post.slug}`}>
                    <h3 className="font-display text-base font-bold leading-snug text-slate-900 transition hover:text-amber-500 dark:text-white line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{formatDate(post.publishedAt)} · {post.readingTimeMinutes || 5} min</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Trending Ranking Widget (Column 3 - 3 cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#151d2e] lg:col-span-3">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Trending Stories
                </h3>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  Top 5
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {trendingPosts.map((tp, rank) => (
                  <div key={tp.id || rank} className="group flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0 dark:border-slate-800/60">
                    <span className="font-display text-2xl font-black text-amber-500/40 transition group-hover:text-amber-500">
                      0{rank + 1}
                    </span>
                    <div>
                      <Link href={`/how-to-guides/${tp.slug || 'article'}`}>
                        <h4 className="text-xs font-bold leading-snug text-slate-900 transition hover:text-amber-500 dark:text-white line-clamp-2">
                          {tp.title}
                        </h4>
                      </Link>
                      <p className="mt-1 text-[10px] text-slate-400">{tp.readingTimeMinutes || 5} min read</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/blog" className="mt-6 flex items-center justify-center rounded-2xl bg-slate-50 py-3 text-xs font-bold text-slate-700 transition hover:bg-amber-500 hover:text-white dark:bg-slate-900 dark:text-slate-300">
              View Full Feed →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MAIN FEED & SIDEBAR SECTION (MAGZIN 2-COLUMN PUBLISHER CONTENT) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Main Feed Column (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Editorial Choice</span>
                <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  Latest Smart Home Research
                </h2>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                {['All', 'Automation', 'Security', 'Reviews', 'Comparisons'].map((tab, idx) => (
                  <button
                    key={tab}
                    className={`rounded-full px-4 py-1.5 transition ${
                      idx === 0
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Magazine Cards */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {mainFeedPosts.map((post, idx) => (
                <div key={post.id || idx} className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-[#151d2e]">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                      <img
                        src={coverImageSrc(post as any) || `/images/about-${idx % 2 === 0 ? 'left' : 'right'}.jpg`}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className={`absolute left-3 top-3 rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${getCategoryBadgeClass(post.categories?.[0]?.slug)}`}>
                        {post.categories?.[0]?.name || 'Article'}
                      </span>
                    </div>

                    <Link href={`/how-to-guides/${post.slug || 'article'}`}>
                      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-slate-900 transition hover:text-amber-500 dark:text-white line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-400">
                      {post.excerpt || 'Explore practical tests, setup rules, and hardware breakdowns.'}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-[11px] text-slate-400 dark:border-slate-800">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="font-semibold text-amber-500">{post.readingTimeMinutes || 5} min read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar Column (4 Columns) */}
          <div className="space-y-8 lg:col-span-4">
            {/* Magzin Newsletter Signup Box */}
            <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-900/10 p-7 shadow-sm dark:bg-slate-900">
              <span className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase text-white">
                Newsletter
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
                Stay Ahead in Smart Tech
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Get weekly independent reviews, setup guides, and ecosystem news directly to your inbox.
              </p>
              <form className="mt-5 space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs focus:border-amber-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="button"
                  className="w-full rounded-2xl bg-amber-500 py-3 text-xs font-bold text-white shadow-md transition hover:bg-amber-600"
                >
                  Subscribe Now
                </button>
              </form>
            </div>

            {/* Magzin Categories Widget */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-[#151d2e]">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800">
                Browse Topics
              </h3>
              <div className="mt-4 space-y-2">
                {[
                  { name: 'Smart Home Automation', count: 24, slug: 'smart-home-automation' },
                  { name: 'Security & Locks', count: 18, slug: 'smart-home-security' },
                  { name: 'Devices & Sensors', count: 15, slug: 'smart-home-devices' },
                  { name: 'Entertainment & Audio', count: 12, slug: 'smart-home-entertainment' },
                  { name: 'Energy & Climate', count: 10, slug: 'smart-home-energy' },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-amber-500/10 hover:text-amber-600 dark:text-slate-300 dark:hover:bg-amber-500/20"
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MAGZIN FOOTER */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-[#151d2e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                NXTSmart<span className="text-amber-500">.Homes</span>
              </span>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Independent smart home guides, hardware comparisons, and field testing to help you build a home that works seamlessly.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Quick Links</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li><Link href="/about" className="hover:text-amber-500">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-amber-500">Contact</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-amber-500">Editorial Policy</Link></li>
                <li><Link href="/sitemap" className="hover:text-amber-500">Sitemap</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Legal</h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li><Link href="/legal/privacy" className="hover:text-amber-500">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-amber-500">Terms of Service</Link></li>
                <li><Link href="/legal/cookies" className="hover:text-amber-500">Cookie Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Ecosystems</h4>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Matter · Thread · Apple HomeKit · Google Home · Amazon Alexa · Home Assistant
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-6 text-center text-xs text-slate-400 dark:border-slate-800">
            © 2026 NXTSmart.Homes. All rights reserved. Powered by Magzin Modern High-Performance Layout.
          </div>
        </div>
      </footer>
    </div>
  );
}
