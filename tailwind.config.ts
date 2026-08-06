import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light scheme: airy blues, softened ink, no heavy navy.
        primary: {
          DEFAULT: '#3b82f6',
          emphasis: '#2563eb',
          hover: '#bfdbfe',
          pressed: '#1d4ed8',
          soft: '#eff6ff',
        },
        accent: {
          DEFAULT: '#06b6d4',
          emphasis: '#0891b2',
          soft: '#ecfeff',
        },
        ink: {
          DEFAULT: '#334155',
          muted: '#64748b',
          faint: '#94a3b8',
        },
        paper: '#fcfcfd',
        surface: '#ffffff',
        muted: '#f1f5f9',
        dark: {
          DEFAULT: '#0c1222',
          surface: '#151d2e',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        // One typeface site-wide: Geist, loaded by next/font in app/layout.tsx.
        // The named keys are kept so existing font-urbanist / font-outfit /
        // font-inter usages keep compiling — they all resolve to Geist now.
        sans: ['var(--font-geist)'],
        display: ['var(--font-geist)'],
        urbanist: ['var(--font-geist)'],
        outfit: ['var(--font-geist)'],
        inter: ['var(--font-geist)'],
      },
      maxWidth: {
        prose: '70ch',
        // Site-wide page container width — all page shells use max-w-7xl.
        '7xl': '1366px',
      },
      borderRadius: {
        '4xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.04)',
        'card-hover': '0 4px 12px rgba(15,23,42,0.08), 0 16px 40px rgba(15,23,42,0.06)',
        glow: '0 0 0 1px rgba(21,86,238,0.12), 0 8px 32px rgba(21,86,238,0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #e0e7ff 100%)',
        'mesh': 'radial-gradient(at 80% 20%, rgba(59,130,246,0.10) 0%, transparent 50%), radial-gradient(at 20% 80%, rgba(6,182,212,0.08) 0%, transparent 50%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
