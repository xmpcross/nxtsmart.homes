'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; text: string };

/**
 * Auto table of contents for legal pages: scans the rendered `.legal-content`
 * for h3 section headings, assigns them slug ids, and renders anchor links
 * with a scroll-spy highlight. Desktop only — hidden on mobile; the parent
 * grid slot collapses there too.
 */
export default function LegalToc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>('.legal-content h3'));
    const list = headings.map((h) => {
      const text = h.textContent?.trim() ?? '';
      const id =
        h.id ||
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      h.id = id;
      h.style.scrollMarginTop = '96px';
      return { id, text };
    });
    setItems(list.filter((i) => i.id && i.text));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveId((e.target as HTMLElement).id);
            break;
          }
        }
      },
      { rootMargin: '-90px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24" data-testid="legal-toc">
      {items.length > 0 && (
        <nav
          className="rounded border border-ink/8 bg-surface p-5 shadow-card"
          aria-label="Table of contents"
        >
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-ink-faint">
            On this page
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {items.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  className={`block rounded px-2.5 py-1.5 leading-snug transition ${
                    activeId === i.id
                      ? 'bg-primary-soft font-semibold text-primary'
                      : 'text-ink-muted hover:bg-muted hover:text-primary'
                  }`}
                >
                  {i.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
