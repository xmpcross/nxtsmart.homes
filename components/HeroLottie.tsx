'use client';

import { useEffect, useRef } from 'react';
import type { AnimationItem } from 'lottie-web';

/*
 * Renders the smart-home Lottie animation (public/animations/smart-home.json)
 * in the draft hero. lottie-web is loaded client-side only.
 */
export default function HeroLottie() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: AnimationItem | undefined;
    let cancelled = false;
    import('lottie-web').then((mod) => {
      if (cancelled || !ref.current) return;
      anim = mod.default.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animations/smart-home.json',
      });
    });
    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, []);

  return <div ref={ref} className="h-full w-full" aria-hidden data-testid="hero-lottie" />;
}
