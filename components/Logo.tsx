/*
 * Site logo — the uploaded brand SVG (newlogo.svg: house mark + NXT / Smart /
 * Homes wordmark as vector paths). Two color variants in public/images/:
 *   logo-light.svg — original white lettering, for the dark hero header
 *   logo-dark.svg  — same artwork with ink lettering, for white headers
 * The house mark and "Smart" line stay brand blue in both.
 */
export default function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const src = tone === 'light' ? '/images/logo-light.svg' : '/images/logo-dark.svg';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="NXT Smart Homes" width={165} height={85} className="h-12 w-auto sm:h-14" />
  );
}
