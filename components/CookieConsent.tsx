'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'cookie-consent';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type ConsentValue = 'accepted' | 'essential';

/** Read the stored choice (client only). Returns null when undecided. */
export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'essential' ? v : null;
}

/**
 * Cookie consent banner: shown until the visitor accepts all cookies or
 * limits us to essential ones. The choice is stored in localStorage and
 * mirrored in a first-party cookie (`cookie-consent`) so the server and any
 * future ad/analytics loaders can read it. Re-surfaces after a year.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  const choose = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    document.cookie = `${STORAGE_KEY}=${value}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: value }));
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-5"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      data-testid="cookie-banner"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border border-ink/10 bg-surface p-5 shadow-card-hover sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-ink">We value your privacy</p>
          <p className="mt-1 text-sm leading-6 text-ink-muted">
            We use cookies to run this site and understand how it's used. With your consent we may
            also use cookies for analytics and advertising. See our{' '}
            <Link href="/legal/cookies" className="font-semibold text-primary underline-offset-2 hover:underline">
              Cookie Information
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch lg:flex-row">
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-emphasis"
            data-testid="cookie-accept"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => choose('essential')}
            className="rounded-lg border border-ink/15 bg-surface px-5 py-2.5 text-sm font-bold text-ink-muted transition hover:border-primary hover:text-primary"
            data-testid="cookie-essential"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
