import Link from 'next/link';
import Image from 'next/image';
import { SITE, SECTIONS } from '@/lib/site';
import MobileNav from '@/components/MobileNav';

const PRIMARY_NAV = SECTIONS.filter((s) =>
  ['product-comparisons', 'product-reviews', 'how-to-guides', 'smart-home-devices'].includes(s.slug),
);

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-ink/8 bg-surface/90 backdrop-blur-md"
      data-testid="site-header"
    >
      <div className="relative mx-auto flex max-w-7xl items-center gap-4 px-5 py-3.5 sm:px-6 sm:py-4">
        <Link href="/" className="block shrink-0" data-testid="logo-link" aria-label={`${SITE.name} home`}>
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={427}
            height={97}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <form
          action="/search"
          method="get"
          role="search"
          className="hidden lg:flex h-10 w-full max-w-xs items-center gap-2 rounded-xl border border-ink/10 bg-muted/60 px-3.5 transition focus-within:border-primary/40 focus-within:bg-white focus-within:shadow-glow"
          data-testid="header-search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 text-ink-faint"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <label htmlFor="header-search-input" className="sr-only">Search {SITE.name}</label>
          <input
            id="header-search-input"
            type="search"
            name="q"
            placeholder="Search…"
            className="h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
            data-testid="header-search-input"
          />
        </form>

        <nav className="ml-auto hidden md:block" data-testid="primary-nav">
          <ul className="flex items-center gap-0.5 text-base font-semibold">
            {PRIMARY_NAV.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="inline-flex items-center rounded-lg px-3 py-2 text-ink-muted transition-colors hover:bg-primary-soft hover:text-primary"
                  data-testid={`nav-${s.slug}`}
                >
                  {s.short}
                </Link>
              </li>
            ))}

            <li className="group/all relative" data-testid="nav-item-all-articles">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-ink-muted transition-colors hover:bg-primary-soft hover:text-primary"
                data-testid="nav-all-articles"
                aria-haspopup="true"
              >
                More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 opacity-60"
                  aria-hidden
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                className="invisible absolute right-0 top-full z-10 mt-2 grid w-[min(90vw,420px)] grid-cols-2 gap-1 rounded-2xl border border-ink/10 bg-white p-2 opacity-0 shadow-card-hover transition duration-150 group-hover/all:visible group-hover/all:opacity-100 group-focus-within/all:visible group-focus-within/all:opacity-100"
                role="menu"
                data-testid="nav-all-articles-dropdown"
              >
                {SECTIONS.filter((s) => !PRIMARY_NAV.some((p) => p.slug === s.slug)).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="rounded-xl px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-muted hover:text-primary"
                    role="menuitem"
                    data-testid={`nav-all-${s.slug}`}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>

        <MobileNav sections={SECTIONS} />
      </div>
    </header>
  );
}
