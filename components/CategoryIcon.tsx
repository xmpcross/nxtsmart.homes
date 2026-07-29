import type { SVGProps } from 'react';

/**
 * Minimal line icons for each editorial / smart-home category.
 * Stroke-based, inherit `currentColor`, so they re-color via text-* utilities.
 * Replaces the previous emoji map for a cleaner, modern, device-UI aesthetic.
 */

type IconPaths = React.ReactNode;

const ICONS: Record<string, IconPaths> = {
  // Automation — lightning / routine
  'smart-home-automation': (
    <>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </>
  ),
  // Security — shield
  'smart-home-security': (
    <>
      <path d="M12 3 5 6v5c0 4.2 2.9 8 7 9 4.1-1 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  // Devices — smartphone / hub
  'smart-home-devices': (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  // Entertainment — display
  'smart-home-entertainment': (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  // Energy — battery / charge
  'smart-home-energy': (
    <>
      <rect x="3" y="8" width="15" height="8" rx="2" />
      <path d="M21 11v2" />
      <path d="m10 9-2 3h3l-2 3" />
    </>
  ),
  // Integration — nodes / network
  'smart-home-integration': (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M7.6 7.7 11 15.6M16.4 7.7 13 15.6M8.4 6h7.2" />
    </>
  ),
  // Reviews — star
  'product-reviews': (
    <>
      <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19l1-5.8-4.3-4.1 5.9-.9L12 3Z" />
    </>
  ),
  // Comparisons — balance scale
  'product-comparisons': (
    <>
      <path d="M12 4v16M7 20h10" />
      <path d="M5 8h14" />
      <path d="M5 8 3 13a2.5 2.5 0 0 0 4 0L5 8Z" />
      <path d="M19 8l-2 5a2.5 2.5 0 0 0 4 0l-2-5Z" />
    </>
  ),
  // How-to — book
  'how-to-guides': (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5V5.5Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5V5.5Z" />
    </>
  ),
  // Top-rated — award
  'top-rated': (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" />
    </>
  ),
  // Informative — lightbulb
  'informative-articles': (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.5 1 .5 1.6V16h6v-.5c0-.6 0-1.2.5-1.6A6 6 0 0 0 12 3Z" />
    </>
  ),
};

const FALLBACK: IconPaths = (
  <>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M8 9h8M8 13h5" />
  </>
);

export default function CategoryIcon({
  slug,
  className,
  ...props
}: { slug: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      {ICONS[slug] ?? FALLBACK}
    </svg>
  );
}
