"use client";

import { useMemo, useState } from "react";
import type { NxtSmartComment } from "@/lib/strapi";

type SubmitState = "idle" | "sending" | "sent" | "error";

function Stars({ rating }: { rating: number }) {
  const full = String.fromCharCode(9733);
  const empty = String.fromCharCode(9734);
  return <span aria-label={rating + " out of 5 stars"} className="text-amber-500">{full.repeat(rating)}{empty.repeat(5 - rating)}</span>;
}

function RatingForm({ postId }: { postId: number | string }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const res = await fetch("/api/reader-ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        authorName: String(data.get("authorName") || ""),
        email: String(data.get("email") || ""),
        rating: Number(data.get("rating") || 0),
        body: String(data.get("body") || ""),
        website: String(data.get("website") || ""),
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) {
      setError(json.error || "Could not submit your rating.");
      setState("error");
      return;
    }
    form.reset();
    setState("sent");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-ink/8 bg-muted/50 p-5" data-testid="reader-rating-form">
      <h3 className="font-display text-lg font-bold text-ink">Share your rating</h3>
      <p className="mt-2 text-sm leading-6 text-ink-muted">Reader ratings are reviewed before they appear publicly.</p>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-ink">Name<input name="authorName" required maxLength={80} className="rounded border border-ink/12 bg-white px-3 py-2 font-normal" /></label>
        <label className="grid gap-2 text-sm font-semibold text-ink">Email<input name="email" type="email" required className="rounded border border-ink/12 bg-white px-3 py-2 font-normal" /></label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-semibold text-ink">Rating<select name="rating" required defaultValue="" className="rounded border border-ink/12 bg-white px-3 py-2 font-normal"><option value="" disabled>Select a rating</option><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label>
      <label className="mt-4 grid gap-2 text-sm font-semibold text-ink">Comment<textarea name="body" required minLength={10} maxLength={4000} rows={4} className="rounded border border-ink/12 bg-white px-3 py-2 font-normal" /></label>
      {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      {state === "sent" && <p className="mt-3 text-sm font-semibold text-emerald-700">Thanks. Your rating is pending review.</p>}
      <button type="submit" disabled={state === "sending"} className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-emphasis disabled:opacity-60">{state === "sending" ? "Submitting..." : "Submit rating"}</button>
    </form>
  );
}

export default function CommentsSection({ comments, postId }: { comments: NxtSmartComment[]; postId: number | string }) {
  const approved = useMemo(() => comments.filter((c) => c.commentStatus === "approved" && c.rating), [comments]);
  const values = approved.map((c) => c.rating!).filter((rating) => rating >= 1 && rating <= 5);
  const average = values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;

  return (
    <section className="mt-10 rounded-4xl border border-ink/8 bg-surface p-6 sm:p-8" data-testid="comments-section">
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink">Reader ratings</h2>
      {average ? (
        <p className="mt-3 text-sm text-ink-muted"><Stars rating={Math.round(average)} /> <strong className="text-ink">{average.toFixed(1)}</strong> out of 5 from {values.length} approved reader rating{values.length === 1 ? "" : "s"}.</p>
      ) : (
        <p className="mt-3 text-sm leading-6 text-ink-muted">No approved reader ratings yet.</p>
      )}
      {approved.length > 0 && (
        <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {approved.map((c) => (
            <li key={c.id} className="rounded-2xl border border-ink/8 bg-surface p-5"><Stars rating={c.rating!} /><p className="mt-3 text-sm leading-6 text-ink-muted">{c.body}</p><p className="mt-4 text-xs text-ink-faint">Submitted by {c.authorName}</p></li>
          ))}
        </ul>
      )}
      <RatingForm postId={postId} />
    </section>
  );
}
