'use client';

import { useState, type FormEvent } from 'react';

const SUBJECTS = [
  'General support',
  'Website issue',
  'Partnership enquiry',
  'Privacy request',
  'Cookie request',
  'Accessibility feedback',
  'Content correction',
  'Legal notice',
  'Other',
];

const inputClass =
  'w-full rounded-lg border border-ink/10 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-faint focus:border-primary-emphasis focus:outline-none focus:ring-2 focus:ring-primary/15';

type Status = { type: 'idle' } | { type: 'sending' } | { type: 'ok' } | { type: 'error'; msg: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.type === 'sending') return;
    // Capture form ref synchronously — React nullifies e.currentTarget once
    // the handler returns / hits the first await.
    const form = e.currentTarget;
    setStatus({ type: 'sending' });

    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      subject: String(fd.get('subject') ?? ''),
      pageUrl: String(fd.get('pageUrl') ?? ''),
      message: String(fd.get('message') ?? ''),
      website: String(fd.get('website') ?? ''), // honeypot
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus({ type: 'error', msg: data.error ?? 'Could not send the message. Please try again later.' });
        return;
      }
      setStatus({ type: 'ok' });
      form.reset();
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Please try again.' });
    }
  }

  if (status.type === 'ok') {
    return (
      <div
        className="rounded-lg border border-ink/8 bg-surface p-6 shadow-sm sm:p-8"
        data-testid="contact-form-success"
      >
        <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
          Thanks — message sent.
        </h2>
        <p className="mt-2 text-sm font-light text-ink-muted">
          We&apos;ve received your note and will reply to the email address you gave us. If it&apos;s
          urgent, you can also reach us at{' '}
          <a href="mailto:hello@nxtsmart.homes" className="underline hover:text-ink">
            hello@nxtsmart.homes
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ type: 'idle' })}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-emphasis"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-ink/8 bg-surface p-6 shadow-sm sm:p-8"
      data-testid="contact-form"
      aria-describedby="contact-form-note"
      noValidate
    >
      <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
        Send us a message
      </h2>
      <p id="contact-form-note" className="mt-1 text-sm font-light text-ink-muted">
        Please don&apos;t send sensitive information (passport numbers, payment details, etc.)
        through this form.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <input id="contact-name" name="name" type="text" autoComplete="name" required maxLength={200} className={inputClass} />
        </Field>

        <Field label="Email" htmlFor="contact-email">
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} className={inputClass} />
        </Field>

        <Field label="Subject" htmlFor="contact-subject" className="sm:col-span-2">
          <select id="contact-subject" name="subject" required defaultValue="" className={`${inputClass} pr-8`}>
            <option value="" disabled hidden>
              Select a topic…
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Page URL (optional)" htmlFor="contact-url" className="sm:col-span-2">
          <input
            id="contact-url"
            name="pageUrl"
            type="url"
            maxLength={500}
            placeholder="https://nxtsmart.homes/…"
            className={inputClass}
          />
        </Field>

        <Field label="Message" htmlFor="contact-message" className="sm:col-span-2">
          <textarea id="contact-message" name="message" rows={6} required maxLength={5000} className={`${inputClass} resize-y`} />
        </Field>

        {/* Honeypot: invisible to humans, bots usually fill all fields */}
        <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.type === 'error' && (
        <p role="alert" className="mt-5 rounded-md bg-primary-emphasis/10 px-3 py-2 text-sm text-primary-emphasis">
          {status.msg}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-muted">
          By submitting, you agree to our{' '}
          <a href="/legal/privacy" className="underline hover:text-ink">
            Privacy Policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status.type === 'sending'}
          className="inline-flex items-center justify-center rounded-lg bg-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-white transition hover:bg-primary-emphasis disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.type === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={`block ${className ?? ''}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-primary">
        {label}
      </span>
      {children}
    </label>
  );
}
