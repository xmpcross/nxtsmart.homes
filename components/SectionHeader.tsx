import Link from 'next/link';

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  viewAll,
  dark = false,
  align = 'left',
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  viewAll?: string;
  dark?: boolean;
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${centered ? 'text-center sm:text-center sm:items-center sm:justify-center' : ''}`}
    >
      <div className={`max-w-2xl ${centered ? 'mx-auto' : ''}`}>
        <p
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${dark ? 'text-accent' : 'text-primary'}`}
        >
          <span className={`h-px w-6 ${dark ? 'bg-accent/60' : 'bg-primary/40'}`} aria-hidden />
          {eyebrow}
        </p>
        <h2
          className={`mt-4 font-display text-[2rem] font-bold leading-tight tracking-tight ${dark ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-3 text-sm leading-7 sm:text-base ${dark ? 'text-white/65' : 'text-ink-muted'}`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {viewAll && (
        <Link
          href={viewAll}
          className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
            dark
              ? 'border border-white/15 text-white hover:border-accent hover:text-accent'
              : 'bg-primary-soft text-primary hover:bg-primary hover:text-white'
          }`}
        >
          See all
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="M5 12h14" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </Link>
      )}
    </div>
  );
}
