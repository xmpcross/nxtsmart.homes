import Link from "next/link";
import type { Metadata } from "next";
import { SECTIONS } from "@/lib/site";
import { listPosts, type NxtSmartPost } from "@/lib/strapi";
import PostCard from "@/components/PostCard";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Optimus Homepage Preview",
  description: "Private Optimus-inspired homepage preview for NXTSmart.Homes.",
  alternates: { canonical: "/home-optimus-preview" },
  robots: { index: false, follow: false },
};

const CATEGORY_ICONS: Record<string, string> = {
  'smart-home-automation': '⚡',
  'smart-home-security': '🔒',
  'smart-home-devices': '📱',
  'smart-home-entertainment': '📺',
  'smart-home-energy': '🔋',
  'smart-home-integration': '🔗',
  'product-reviews': '⭐',
  'product-comparisons': '⚖️',
  'how-to-guides': '📖',
  'top-rated': '🏆',
  'informative-articles': '💡',
};

const caps = [
  ["01", "Instant Deployment", "Push to production in seconds. Our edge network ensures your applications load instantly, anywhere in the world."],
  ["02", "AI-Native Workflows", "Build intelligent applications with built-in AI capabilities. From inference to training, everything scales automatically."],
  ["03", "Real-time Collaboration", "Work together seamlessly. Live preview, instant feedback, and version control that actually makes sense."],
  ["04", "Enterprise Security", "Bank-grade encryption, SOC 2 compliance, and granular access controls. Your data stays yours."],
];

const steps = [
  ["I", "Connect your tools", "Integrate with your existing stack in minutes. We support 200+ data sources out of the box."],
  ["II", "Build your workflow", "Design powerful automations with our visual builder or write code directly."],
  ["III", "Ship to production", "Deploy globally with zero configuration. Your app goes live in under 30 seconds."],
];

const places = [["San Francisco", "US West", "12ms"], ["New York", "US East", "18ms"], ["London", "Europe", "24ms"], ["Tokyo", "Asia Pacific", "32ms"], ["Sydney", "Oceania", "45ms"], ["Sao Paulo", "South America", "38ms"]];
const trust = ["Local control", "Privacy settings", "Layered security", "Firmware updates"];
const dev = [["Room-by-room planning", "Start with the rooms and routines that matter most, then choose devices that solve a real daily problem."], ["Compatibility clarity", "Understand Matter, Thread, Zigbee, Z-Wave, Wi-Fi, and ecosystem limits before buying hardware."], ["Privacy-first choices", "Compare local control, cloud features, subscriptions, and data tradeoffs in plain language."], ["Automation that lasts", "Build practical routines for security, lighting, energy, and comfort without overcomplicating the setup."]];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{children}</p>;
}

function Intro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight tracking-tight text-ink">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink-muted">{body}</p>
    </div>
  );
}

export default async function OptimusHomePreviewPage() {
  const previewSections = SECTIONS.slice(0, 6);
  const comparisons = await listPosts({ category: "product-comparisons", pageSize: 5 })
    .then((r) => r.data)
    .catch(() => [] as NxtSmartPost[]);
  const reviews = await listPosts({ category: "product-reviews", pageSize: 5 })
    .then((r) => r.data)
    .catch(() => [] as NxtSmartPost[]);
  const guides = await listPosts({ category: "how-to-guides", pageSize: 4 })
    .then((r) => r.data)
    .catch(() => [] as NxtSmartPost[]);

  return (
    <div className="bg-paper text-ink" data-testid="optimus-home-preview">
      <section className="relative isolate overflow-hidden border-b border-primary/10 bg-white px-5 py-16 sm:px-6 lg:py-24">
        
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="text-left">
            <span className="inline-flex rounded-full border border-ink/10 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">The platform for modern smart homes</span>
            <h1 className="mt-8 max-w-3xl font-display text-[4rem] font-bold leading-[0.95] tracking-tight text-ink">The platform to create a smarter home.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink-muted">A duplicated homepage inspired by the v0 Optimus template. The live homepage is unchanged, and this preview keeps the template header structure for later copy updates.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/smart-home-automation" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-emphasis">Start creating</Link><Link href="/" className="rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-bold text-ink hover:border-primary hover:text-primary">Watch current home</Link></div>
          </div>
          <div className="relative min-h-[340px] scale-[0.86] lg:min-h-[450px] lg:scale-[0.82]" aria-label="Animated smart home interface preview">
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-dashed border-primary/30 [animation-duration:28s]" />
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border border-dashed border-accent/40 [animation-duration:18s] [animation-direction:reverse]" />
            <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-2xl ring-1 ring-ink/10"><div className="flex h-full flex-col items-center justify-center text-center"><span className="h-3 w-3 animate-pulse rounded-full bg-primary" /><p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">NXTSmart</p><p className="mt-1 font-display text-lg font-bold text-ink">Ready</p></div></div>
            <div className="absolute left-4 top-8 w-52 animate-pulse rounded-lg border border-ink/10 bg-white/90 p-4 shadow-card"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Security</p><p className="mt-2 font-display text-xl font-bold text-ink">Doors armed</p><div className="mt-4 h-2 rounded-full bg-muted"><div className="h-2 w-4/5 rounded-full bg-primary" /></div></div>
            <div className="absolute right-3 top-20 w-56 rounded-lg border border-ink/10 bg-white/90 p-4 shadow-card-hover"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-emphasis">Automation</p><p className="mt-2 font-display text-xl font-bold text-ink">Evening scene</p><div className="mt-4 grid grid-cols-4 gap-2">{[1, 2, 3, 4].map((dot) => <span key={dot} className="h-8 rounded bg-primary-soft" />)}</div></div>
            <div className="absolute bottom-20 left-0 w-56 rounded-lg border border-ink/10 bg-[#111827] p-4 text-white shadow-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Workflow</p><pre className="mt-3 overflow-hidden text-xs leading-5 text-primary-soft"><code>{"home.sync()\nscene.ship()\nalerts.ready"}</code></pre></div>
            <div className="absolute bottom-8 right-8 w-48 animate-pulse rounded-lg border border-ink/10 bg-white/90 p-4 shadow-card [animation-delay:700ms]"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Energy</p><p className="mt-2 font-display text-3xl font-bold text-ink">18%</p><p className="text-sm text-ink-muted">less idle use</p></div>
          </div>
        </div>
      </section>

      <section className="border-b border-primary/10 bg-primary-soft/70" data-testid="category-strip"><div className="mx-auto flex max-w-7xl justify-center gap-2 overflow-x-auto px-5 py-4 sm:px-6">{[{ slug: "product-comparisons", label: "Comparisons" }, { slug: "product-reviews", label: "Reviews" }, { slug: "how-to-guides", label: "How-to" }, { slug: "smart-home-security", label: "Security" }, { slug: "smart-home-devices", label: "Devices" }, { slug: "smart-home-energy", label: "Energy" }].map((item) => <Link key={item.slug} href={"/" + item.slug} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-muted/50 px-4 py-2 text-sm font-semibold text-ink-muted transition hover:border-primary/25 hover:bg-primary-soft hover:text-primary"><span aria-hidden>{CATEGORY_ICONS[item.slug] ?? "→"}</span>{item.label}</Link>)}</div></section>

      <section className="bg-surface py-16 sm:py-20" data-testid="section-sets"><div className="mx-auto max-w-7xl px-5 sm:px-6"><Intro eyebrow="Browse by topic" title="Everything smart home, organized." body="Six editorial formats and six smart-home topics - pick where you want to start." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{previewSections.map((s) => <Link key={s.slug} href={"/" + s.slug} className="group relative flex min-h-[260px] flex-col overflow-hidden rounded border border-ink/8 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover" data-testid={"set-" + s.slug}><div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#3b82f6,#06b6d4,#22c55e)] opacity-80" /><div className="flex items-center gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded border border-ink/10 bg-muted/60 text-4xl leading-none transition group-hover:border-primary/25 group-hover:bg-primary-soft" aria-hidden>{CATEGORY_ICONS[s.slug] ?? "📄"}</div><h3 className="font-display text-xl font-bold leading-snug text-ink">{s.title}</h3></div><p className="mt-5 flex-1 overflow-hidden text-sm leading-6 text-ink-muted line-clamp-2 max-h-12 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{s.blurb}</p><div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-4"><span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Explore topic</span><span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-sm font-bold text-white transition group-hover:bg-primary-emphasis" aria-hidden>→</span></div></Link>)}</div></div></section>

      <HeadToHead posts={comparisons} />

      <HowToGuides posts={guides} />

      <HandsOn posts={reviews} />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.95fr_1fr]"><div className="rounded-lg border border-ink/10 bg-white p-5 shadow-card-hover"><div className="flex gap-2 border-b border-ink/10 pb-4"><span className="h-3 w-3 rounded-full bg-red-400"/><span className="h-3 w-3 rounded-full bg-yellow-400"/><span className="h-3 w-3 rounded-full bg-green-400"/></div><pre className="overflow-x-auto pt-5 text-sm leading-7 text-ink-muted"><code>{"map your rooms\ncompare ecosystems\nautomate daily routines"}</code></pre></div><div><Eyebrow>For homeowners</Eyebrow><h2 className="mt-4 font-display text-[2rem] font-bold leading-tight">Plan a smarter home with less guesswork.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted">NXTSmart.Homes helps you choose compatible devices, compare real tradeoffs, and build automations that make daily life easier without locking you into the wrong ecosystem.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{dev.map(([title, body]) => <div key={title} className="rounded-lg border border-ink/10 bg-white p-5"><h3 className="font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-muted">{body}</p></div>)}</div></div></section>

      <OurProcess />


      <section className="px-4 py-10 sm:px-6 sm:py-16"><div className="relative mx-auto grid min-h-[560px] max-w-7xl overflow-hidden border-0 bg-hero-gradient lg:grid-cols-2"><div className="absolute right-0 top-0 h-32 w-32 border-b border-l border-ink/10" /><div className="absolute bottom-0 left-0 h-32 w-32 border-r border-t border-ink/10" /><div className="relative z-10 flex flex-col justify-center px-8 py-16 sm:px-14 lg:px-16"><h2 className="max-w-xl font-display text-[2rem] font-bold leading-tight tracking-tight text-ink">Ready to build<br />something great?</h2><p className="mt-8 max-w-xl text-lg leading-8 text-ink-muted">Join thousands of teams shipping faster with Optimus. Start free, scale infinitely.</p><div className="mt-12 flex flex-wrap gap-4"><Link href="/smart-home-automation" className="inline-flex h-14 items-center rounded-full bg-primary px-6 text-sm font-bold text-white">Start building free <span className="ml-4 text-xl">→</span></Link><Link href="/contact" className="inline-flex h-14 items-center rounded-full border border-primary/20 bg-white px-8 text-sm font-bold text-primary">Talk to sales</Link></div></div><SmartHomeAutomationVisual /></div></section>
    </div>
  );
}

function HeadToHead({ posts }: { posts: NxtSmartPost[] }) {
  const [feature, ...rest] = posts;
  if (!feature) return null;
  const factors = ['Compatibility', 'Subscription cost', 'Privacy controls', 'Setup effort'];

  return (
    <section className="bg-primary-soft/45 py-16 text-ink sm:py-20" data-testid="popular-product-comparisons">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded border border-primary/15 bg-surface p-7 text-ink shadow-card sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Head-to-head</p>
            <h2 className="mt-5 font-display text-[2rem] font-bold leading-tight tracking-tight">
              Make the side-by-side call faster.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-muted">
              Compare smart home products by the things that actually change the experience: ecosystem fit, automation depth, privacy, fees, and setup friction.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {factors.map((factor) => (
                <div key={factor} className="flex items-center justify-between rounded border border-primary/10 bg-primary-soft/70 px-4 py-3">
                  <span className="text-sm font-semibold text-ink-muted">{factor}</span>
                  <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                </div>
              ))}
            </div>
            <Link href="/product-comparisons" className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-emphasis">
              Browse comparisons
              <span className="ml-3" aria-hidden>→</span>
              </Link>
          </div>

          <div className="grid gap-5">
            <div className="rounded border border-ink/8 bg-muted p-4 shadow-card sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Featured comparison</p>
                  <p className="mt-1 text-sm text-ink-muted">A deeper look at the current top decision.</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink-muted shadow-sm">Updated weekly</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {rest.slice(0, 4).map((p, index) => (
                <article key={p.id} className="rounded border border-ink/8 bg-surface p-4 shadow-card transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover">
                  <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">
                    <span>Compare {String(index + 1).padStart(2, '0')}</span>
                    <span>{p.readingTimeMinutes ?? 5} min</span>
                  </div>
                  <PostCard post={p} variant="horizontal" thumbBg="bg-muted/50" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HandsOn({ posts }: { posts: NxtSmartPost[] }) {
  const [feature, ...rest] = posts;
  if (!feature) return null;

  return (
    <section className="bg-paper px-5 py-16 text-ink sm:px-6 sm:py-20" data-testid="popular-product-reviews">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Hands-on</p>
            <h2 className="mt-4 max-w-2xl font-display text-[2rem] font-bold leading-tight tracking-tight">
              Reviews that get past the spec sheet.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink-muted">
              We focus on setup, reliability, compatibility, privacy, and day-to-day use so you know what a device is like after the box is open.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Setup notes', 'Real tradeoffs', 'Compatibility checks'].map((label) => (
                <span key={label} className="rounded border border-ink/10 bg-white px-4 py-2 text-xs font-bold text-ink-muted">
                  {label}
                </span>
              ))}
            </div>
          </div>
            <Link href="/product-reviews" className="inline-flex w-fit items-center rounded bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-emphasis lg:justify-self-end">
            View all reviews
            <span className="ml-3" aria-hidden>→</span>
            </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded border border-ink/8 bg-white p-5 text-ink shadow-card sm:p-6">
            <PostCard post={feature} variant="feature" thumbBg="bg-muted/50" />
          </div>
          <div className="grid gap-4">
            {rest.slice(0, 3).map((p, index) => (
              <div key={p.id} className="rounded border border-ink/8 bg-white p-4 shadow-card transition hover:border-primary/20 hover:shadow-card-hover">
                <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em] text-ink-faint">
                  <span>Review {String(index + 1).padStart(2, '0')}</span>
                  <span>{p.readingTimeMinutes ?? 5} min</span>
                </div>
                <div className="rounded bg-white p-3 text-ink">
                  <PostCard post={p} variant="horizontal" thumbBg="bg-muted/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OurProcess() {
  const processSteps = [
    {
      n: '01',
      title: 'We track real demand',
      body: 'Categories come from what people are actually shopping for - not what brands want to push.',
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
    <section className="border-y border-primary/10 bg-primary-soft/55 py-20 text-ink" data-testid="how-we-work">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeader
          eyebrow="Our process"
          title="How we choose what to recommend"
          subtitle="No paid placements. No spec-sheet shortcuts. Three steps, every time."
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-3">
          {processSteps.map((s) => (
            <li key={s.n} className="rounded-4xl border border-ink/8 bg-surface p-6 shadow-card transition hover:border-accent/30">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft font-display text-sm font-bold text-primary">
                {s.n}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold leading-snug text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HowToGuides({ posts }: { posts: NxtSmartPost[] }) {
  if (posts.length === 0) return null;

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

function SmartHomeAutomationVisual() {
  const devices = [
    ['Security', 'Doors locked', 'left-4 top-10', 'bg-primary-soft text-primary'],
    ['Lighting', 'Evening scene', 'right-6 top-20', 'bg-accent-soft text-accent-emphasis'],
    ['Climate', '22 C', 'left-8 bottom-24', 'bg-white text-ink'],
    ['Energy', '-18%', 'right-10 bottom-12', 'bg-white text-ink'],
  ];

  return (
    <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]" aria-label="Animated smart home automation preview">
      <div className="absolute inset-6 rounded-[2rem] border border-transparent bg-transparent shadow-none" />
      <div className="absolute inset-8 rounded-[1.75rem] bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <svg className="absolute left-1/2 top-1/2 h-[310px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-ink" viewBox="0 0 420 310" fill="none" aria-hidden>
        <path d="M76 176 L210 74 L344 176" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M112 166 V258 H308 V166" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M182 258 V198 H238 V258" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M142 180 H174 V212 H142 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        <path d="M250 180 H282 V212 H250 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        <path className="animate-pulse text-primary" d="M210 74 V30 M344 176 H394 M76 176 H26 M210 198 V142" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <circle className="animate-pulse text-primary" cx="210" cy="142" r="16" fill="currentColor" />
        <circle cx="26" cy="176" r="7" fill="currentColor" className="text-primary" />
        <circle cx="394" cy="176" r="7" fill="currentColor" className="text-accent-emphasis" />
      </svg>

      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 bg-white/25 shadow-none backdrop-blur-sm">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <span className="h-3 w-3 animate-ping rounded-full bg-primary" />
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted">Hub</p>
          <p className="font-display text-lg font-bold text-ink">Online</p>
        </div>
      </div>

      <div className="absolute left-[18%] top-[46%] h-px w-[64%] bg-primary/25" />
      <div className="absolute left-[18%] top-[46%] h-1 w-20 rounded-full bg-primary [animation:smart-flow-x_3.4s_linear_infinite]" />
      <div className="absolute left-[49%] top-[20%] h-[60%] w-px bg-accent/25" />
      <div className="absolute left-[49%] top-[20%] h-20 w-1 rounded-full bg-accent [animation:smart-flow-y_4s_linear_infinite]" />

      {devices.map(([label, value, position, tone], index) => (
        <div key={label} className={
          'absolute w-44 rounded-2xl border border-ink/10 bg-white/25 p-4 shadow-none backdrop-blur ' +
          position +
          ' ' +
          (index % 2 === 0 ? 'animate-pulse' : '')
        }>
          <div className="flex items-center gap-3">
            <span className={'flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ' + tone}>{label.slice(0, 2)}</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-faint">{label}</p>
              <p className="mt-1 font-display text-base font-bold text-ink">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
