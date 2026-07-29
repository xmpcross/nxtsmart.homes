import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6" data-testid="not-found">
      <div className="rounded-4xl border border-ink/8 bg-gradient-to-br from-primary-soft/50 via-surface to-accent-soft/30 px-6 py-16 shadow-card">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
          That page wandered off
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Try the homepage or browse a section below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-emphasis"
          >
            Home
          </Link>
          <Link
            href="/product-comparisons"
            className="inline-flex items-center rounded-xl border border-ink/12 bg-white px-5 py-2.5 text-sm font-bold text-ink transition hover:border-primary hover:text-primary"
          >
            Browse comparisons
          </Link>
        </div>
      </div>
    </section>
  );
}
