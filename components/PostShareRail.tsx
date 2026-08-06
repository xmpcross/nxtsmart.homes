'use client';

import { useState } from 'react';

interface Props {
  title: string;
  url: string;
  readingMinutes?: number;
}

/**
 * The narrow rail that runs down the left of a post: a circular reading-time
 * badge and a vertical stack of share icons, sticky beside the article the way
 * the reference layout does it. Hidden below `lg`, where the horizontal share
 * row in the post footer takes over.
 */
export default function PostShareRail({ title, url, readingMinutes }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  function copyLink() {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }

  const iconClass =
    'flex h-9 w-9 items-center justify-center rounded-full text-[#29294b] transition hover:bg-[#5955d1] hover:text-white';

  // Two levels on purpose, exactly as the reference does it: the outer column
  // is a plain grid item that stretches to the full height of the article, and
  // the short inner block is the sticky one. Making the grid item itself
  // sticky gives it no room to travel — it fills its own containing block.
  return (
    <div className="hidden lg:block" data-testid="share-rail-column">
    <div className="sticky top-28 flex flex-col items-center gap-5" data-testid="share-rail">
      {readingMinutes ? (
        <span className="flex h-[74px] w-[74px] flex-col items-center justify-center rounded-full bg-white text-center text-[13px] font-semibold leading-tight text-[#29294b] shadow-[0_2px_10px_rgba(41,41,75,0.08)]">
          {readingMinutes} min
          <br />
          read
        </span>
      ) : null}

      <div className="flex flex-col items-center gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className={iconClass}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className={iconClass}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={iconClass}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.71h.05c.53-.95 1.83-1.96 3.76-1.96C20.4 8.75 21 11 21 14.1V21h-4v-6.1c0-1.46-.03-3.33-2.06-3.33-2.06 0-2.38 1.58-2.38 3.22V21H9z" />
          </svg>
        </a>

        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          title={copied ? 'Link copied' : 'Copy link'}
          className={iconClass}
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-[18px] w-[18px]">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-[18px] w-[18px]">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>
      </div>
    </div>
    </div>
  );
}
