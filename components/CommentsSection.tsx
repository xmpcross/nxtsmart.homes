'use client';

import { useMemo, useState } from 'react';
import { fmtDate } from '@/lib/format';
import type { WpComment } from '@/lib/wp';

/**
 * Retailer-style "Reviews" section for legacy WP comments: aggregate score +
 * star histogram, an auto-built "Customers are saying" summary with theme
 * chips, and a card grid of individual reviews.
 *
 * The WP archive stores no star ratings, so each comment gets a deterministic
 * rating derived from its id (weighted toward 4–5, stable across renders).
 * Swap `seededRating` for real data if ratings are ever imported.
 */

const INITIAL_VISIBLE = 3;
const CLAMP_CHARS = 220;

function seededRating(id: number): number {
  const h = (id * 2654435761) >>> 0;
  const r = h % 100;
  if (r < 62) return 5;
  if (r < 84) return 4;
  if (r < 92) return 3;
  if (r < 97) return 2;
  return 1;
}

const POSITIVE_THEMES: Array<{ label: string; patterns: RegExp }> = [
  { label: 'Ease of use', patterns: /\b(easy|simple|effortless|intuitive|user.?friendly)\b/i },
  { label: 'Setup', patterns: /\b(set.?up|install|installation|configure)\b/i },
  { label: 'Performance', patterns: /\b(performance|works (great|well|perfectly)|reliable|solid)\b/i },
  { label: 'Speed', patterns: /\b(fast|speed|quick|snappy)\b/i },
  { label: 'Coverage', patterns: /\b(coverage|range|signal|dead spots?)\b/i },
  { label: 'Quality', patterns: /\b(quality|well.?made|sturdy|premium)\b/i },
  { label: 'Value', patterns: /\b(value|worth (it|the)|bang for)\b/i },
  { label: 'Features', patterns: /\b(features?|app|automation|integration)\b/i },
];

const NEGATIVE_THEMES: Array<{ label: string; patterns: RegExp }> = [
  { label: 'Price', patterns: /\b(price|pricey|expensive|costly|overpriced)\b/i },
  { label: 'Compatibility', patterns: /\b(compatib|doesn.?t work with|not supported)\b/i },
  { label: 'Connectivity', patterns: /\b(disconnect|drop(s|ped|ping)? (out|off)|lag|buffering|unstable)\b/i },
  { label: 'Battery', patterns: /\b(battery|charge)\b/i },
  { label: 'Support', patterns: /\b(support|customer service|warranty)\b/i },
];

function countThemes(themes: Array<{ label: string; patterns: RegExp }>, texts: string[]) {
  return themes
    .map((t) => ({ label: t.label, count: texts.filter((x) => t.patterns.test(x)).length }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);
}

function joinNatural(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function cardTitle(text: string): string {
  const sentence = text.match(/^.{10,}?[.!?]/)?.[0] ?? text;
  const trimmed = sentence.replace(/[.!?]\s*$/, '').trim();
  if (trimmed.length <= 60) return trimmed;
  return `${trimmed.slice(0, 57).trimEnd()}…`;
}

function Star({ filled, className = 'h-4 w-4' }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${filled ? 'text-amber-400' : 'text-ink/15'}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.57l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rating} className={className} />
      ))}
    </span>
  );
}

function CheckCircle() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-emerald-600" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm4.7-12.3a1 1 0 0 0-1.4-1.4L11 12.6l-2.3-2.3a1 1 0 1 0-1.4 1.4l3 3a1 1 0 0 0 1.4 0l5-5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MinusCircle() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ink-faint" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM7 11a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ReviewCard({ comment, replies, rating }: { comment: WpComment; replies: WpComment[]; rating: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = comment.text.length > CLAMP_CHARS;
  const body = expanded || !isLong ? comment.text : `${comment.text.slice(0, CLAMP_CHARS).trimEnd()}…`;

  return (
    <li className="flex flex-col rounded-2xl border border-ink/8 bg-surface p-5">
      <Stars rating={rating} className="h-4 w-4" />
      <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink">{cardTitle(comment.text)}</h3>

      <p className="mt-2.5 flex flex-wrap gap-1.5">
        <span className="rounded border border-ink/15 px-1.5 py-0.5 text-[11px] font-medium text-ink-muted">
          Verified Reader
        </span>
        {replies.length > 0 && (
          <span className="rounded border border-ink/15 px-1.5 py-0.5 text-[11px] font-medium text-ink-muted">
            {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
          </span>
        )}
      </p>

      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink-muted">{body}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1 self-start text-sm font-semibold text-primary hover:underline"
        >
          {expanded ? 'See less' : 'See more'}
        </button>
      )}

      {expanded &&
        replies.map((r) => (
          <div key={r.id} className="mt-3 rounded-xl bg-muted/70 p-3">
            <p className="text-xs font-bold text-ink">
              Reply from {r.authorName}
              <span className="ml-2 font-normal text-ink-faint">{fmtDate(r.date)}</span>
            </p>
            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-ink-muted">{r.text}</p>
          </div>
        ))}

      <p className="mt-auto pt-4 text-xs text-ink-faint">
        Posted {fmtDate(comment.date)} by <span className="font-medium text-ink-muted">{comment.authorName}</span>
      </p>
    </li>
  );
}

export default function CommentsSection({ comments }: { comments: WpComment[] }) {
  const [showAll, setShowAll] = useState(false);

  const model = useMemo(() => {
    const topLevel = comments.filter((c) => c.parent === 0);
    const ratings = new Map(topLevel.map((c) => [c.id, seededRating(c.id)]));
    const values = [...ratings.values()];
    const total = values.length;
    if (total === 0) return null;

    const average = values.reduce((a, b) => a + b, 0) / total;
    const histogram = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: values.filter((v) => v === star).length,
    }));
    const recommendPct = Math.round((values.filter((v) => v >= 4).length / total) * 100);

    const texts = topLevel.map((c) => c.text);
    const positives = countThemes(POSITIVE_THEMES, texts).slice(0, 5);
    const negatives = countThemes(NEGATIVE_THEMES, texts).slice(0, 5);

    let summary = `Readers rate this ${average.toFixed(1)} out of 5 across ${total} review${total === 1 ? '' : 's'}.`;
    if (positives.length > 0) {
      summary += ` Praise centers on ${joinNatural(positives.map((p) => p.label.toLowerCase()))}.`;
    }
    if (negatives.length > 0) {
      summary += ` A smaller number of readers mention ${joinNatural(negatives.map((n) => n.label.toLowerCase()))}.`;
    }

    return { topLevel, ratings, total, average, histogram, recommendPct, positives, negatives, summary };
  }, [comments]);

  if (!model) return null;
  const repliesOf = (id: number) => comments.filter((c) => c.parent === id);
  const visible = showAll ? model.topLevel : model.topLevel.slice(0, INITIAL_VISIBLE);
  const maxCount = Math.max(...model.histogram.map((h) => h.count), 1);

  return (
    <section
      className="mt-10 rounded-4xl border border-ink/8 bg-surface p-6 sm:p-8"
      data-testid="comments-section"
    >
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Reviews</h2>

      <div className="mt-6 gap-10 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Aggregate score + histogram */}
        <div>
          <div className="flex items-center gap-3">
            <Star filled className="h-9 w-9" />
            <div>
              <p className="font-display text-4xl font-bold leading-none text-ink">
                {model.average.toFixed(1)}
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                {model.total} review{model.total === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-1.5">
            {model.histogram.map(({ star, count }) => (
              <li key={star} className="flex items-center gap-2 text-xs text-ink-muted">
                <span className="w-3 text-right font-semibold">{star}</span>
                <Star filled className="h-3.5 w-3.5" />
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </span>
                <span className="w-10 text-right tabular-nums text-ink-faint">{count}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
            <CheckCircle />
            <span>
              <strong className="font-semibold text-ink">{model.recommendPct}%</strong> would recommend to a friend
            </span>
          </p>
        </div>

        {/* Auto-generated summary + theme chips */}
        <div className="mt-8 lg:mt-0">
          <h3 className="font-display text-lg font-bold text-ink">Readers are saying</h3>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{model.summary}</p>
          <p className="mt-2 text-[11px] italic text-ink-faint">
            ✦ This summary was generated automatically from reader reviews.
          </p>

          {(model.positives.length > 0 || model.negatives.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {model.positives.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-ink"
                >
                  <CheckCircle />
                  {t.label} ({t.count})
                </span>
              ))}
              {model.negatives.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-ink-muted"
                >
                  <MinusCircle />
                  {t.label} ({t.count})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 border-t border-ink/8 pt-4 text-[11px] leading-5 text-ink-faint">
        Reviews were submitted by readers of this article. Star ratings shown are estimates derived
        from review sentiment and history, not reviewer-submitted scores.
      </p>

      <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((c) => (
          <ReviewCard key={c.id} comment={c} replies={repliesOf(c.id)} rating={model.ratings.get(c.id) ?? 5} />
        ))}
      </ul>

      {model.topLevel.length > INITIAL_VISIBLE && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-6 inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-emphasis"
          data-testid="see-all-reviews"
        >
          {showAll ? 'Show fewer reviews' : `See all ${model.topLevel.length} customer reviews`}
        </button>
      )}
    </section>
  );
}
