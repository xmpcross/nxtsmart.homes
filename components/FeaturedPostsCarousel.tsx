'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface FeaturedPost {
  id: number | string;
  href: string;
  title: string;
  image: string | null;
  category?: string;
  author: string;
  date: string;
}

/**
 * Featured posts as a one-at-a-time card: the image fills the tile, the
 * category sits top-left, and the byline and headline are laid over a dark
 * gradient at the foot. Dots below switch posts.
 */
export default function FeaturedPostsCarousel({ posts }: { posts: FeaturedPost[] }) {
  const [index, setIndex] = useState(0);
  if (posts.length === 0) return null;

  const active = posts[Math.min(index, posts.length - 1)];

  return (
    <section data-testid="sidebar-featured">
      <h2 className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#696981]">Featured posts</h2>

      <div className="group relative overflow-hidden rounded-2xl bg-[#eceaff]">
        <Link href={active.href} className="block">
          {active.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={active.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="aspect-[5/4] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="block aspect-[5/4] w-full bg-gradient-to-br from-[#eceaff] to-[#c9c6f5]" />
          )}

          {/* Dark foot so the white type stays readable on any photo. */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

          {active.category && (
            <span className="absolute left-4 top-4 rounded-md bg-white/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
              {active.category}
            </span>
          )}

          <span className="absolute inset-x-0 bottom-0 p-5">
            <span className="block text-[13px] font-semibold text-white/95">
              {active.author} <span className="font-normal text-white/70">on {active.date}</span>
            </span>
            <span className="mt-2 block text-[19px] font-bold leading-[1.3] tracking-[-0.02em] text-white">
              {active.title}
            </span>
          </span>
        </Link>
      </div>

      {posts.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {posts.map((post, i) => {
            const isActive = i === Math.min(index, posts.length - 1);
            return (
              <button
                key={post.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show featured post ${i + 1}: ${post.title}`}
                aria-current={isActive}
                className={`h-1.5 rounded-full transition-all ${
                  isActive ? 'w-6 bg-[#29294b]' : 'w-1.5 bg-[#c9c9d6] hover:bg-[#9a9ab5]'
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
