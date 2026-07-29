'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Section } from '@/lib/site';

export default function MobileNav({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-white text-ink transition hover:border-primary/30"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        data-testid="mobile-nav-toggle"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden>
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-50 border-b border-ink/10 bg-white/98 px-6 py-5 shadow-card backdrop-blur-lg"
          data-testid="mobile-nav-panel"
        >
          <form action="/search" method="get" role="search" className="mb-5 flex h-11 items-center gap-2 rounded-xl border border-ink/10 bg-muted px-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              name="q"
              placeholder="Search guides, reviews…"
              className="h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
              aria-label="Search"
            />
          </form>

          <nav>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-ink transition hover:bg-muted hover:text-primary"
                  >
                    {s.title}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 text-ink-faint" aria-hidden>
                      <path d="M5 12h14" />
                      <polyline points="13 6 19 12 13 18" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
