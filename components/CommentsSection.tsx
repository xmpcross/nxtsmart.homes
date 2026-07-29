import { fmtDate } from '@/lib/format';
import type { WpComment } from '@/lib/wp';

/**
 * Read-only comment thread (legacy comments served by the WP archive).
 * One level of nesting: replies indent under their parent.
 */
function Comment({ comment, replies }: { comment: WpComment; replies: WpComment[] }) {
  return (
    <li className="rounded-2xl border border-ink/8 bg-surface p-5">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-sm font-bold text-ink">{comment.authorName}</span>
        <span className="text-xs text-ink-faint">{fmtDate(comment.date)}</span>
      </p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-muted">{comment.text}</p>
      {replies.length > 0 && (
        <ul className="mt-4 space-y-4 border-l-2 border-primary-soft pl-4">
          {replies.map((r) => (
            <li key={r.id}>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-sm font-bold text-ink">{r.authorName}</span>
                <span className="text-xs text-ink-faint">{fmtDate(r.date)}</span>
              </p>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink-muted">{r.text}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CommentsSection({ comments }: { comments: WpComment[] }) {
  if (comments.length === 0) return null;
  const topLevel = comments.filter((c) => c.parent === 0);
  const repliesOf = (id: number) => comments.filter((c) => c.parent === id);

  return (
    <section className="mt-10" data-testid="comments-section">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
        Comments ({comments.length})
      </h2>
      <ul className="mt-6 space-y-4">
        {topLevel.map((c) => (
          <Comment key={c.id} comment={c} replies={repliesOf(c.id)} />
        ))}
      </ul>
    </section>
  );
}
