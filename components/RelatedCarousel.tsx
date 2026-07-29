'use client';

import { useEffect, useRef } from 'react';
import PostCard from '@/components/PostCard';
import type { NxtSmartPost } from '@/lib/strapi';

/**
 * Auto-sliding carousel for the "More in <category>" section.
 * Shows 4 cards per view on desktop (2 on small screens, 1 on phones),
 * advances one full view every few seconds, wraps back to the start, and
 * pauses while the user hovers or touches it. Native scroll + snap, so
 * manual swiping keeps working.
 */
const SLIDE_INTERVAL_MS = 4000;

export default function RelatedCarousel({ posts }: { posts: NxtSmartPost[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const timer = setInterval(() => {
      if (pausedRef.current) return;
      const maxLeft = track.scrollWidth - track.clientWidth;
      if (maxLeft <= 0) return;
      const next = track.scrollLeft >= maxLeft - 8 ? 0 : Math.min(track.scrollLeft + track.clientWidth, maxLeft);
      track.scrollTo({ left: next, behavior: 'smooth' });
    }, SLIDE_INTERVAL_MS);

    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume);

    return () => {
      clearInterval(timer);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend', resume);
    };
  }, [posts.length]);

  return (
    <div
      ref={trackRef}
      className="scrollbar-none -mx-2 mt-8 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      data-testid="related-carousel"
    >
      {posts.map((post) => (
        <div key={post.id} className="w-full shrink-0 snap-start px-2 sm:w-1/2 lg:w-1/4">
          <PostCard post={post} variant="tile" thumbBg="" />
        </div>
      ))}
    </div>
  );
}
