import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1556ee',
          emphasis: '#0f43c0',
          hover: '#c8d6fb',
          pressed: '#0c389f',
          soft: '#e8effe',
        },
        accent: {
          DEFAULT: '#06b6d4',
          emphasis: '#0891b2',
          soft: '#ecfeff',
        },
        ink: {
          DEFAULT: '#0f172a',
          muted: '#475569',
          faint: '#94a3b8',
        },
        paper: '#fafaf9',
        surface: '#ffffff',
        muted: '#f1f5f9',
        dark: {
          DEFAULT: '#0c1222',
          surface: '#151d2e',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-inter)'],
        urbanist: ['var(--font-inter)'],
        outfit: ['var(--font-inter)'],
      },
      maxWidth: { prose: '70ch' },
      borderRadius: {
        '4xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.04)',
        'card-hover': '0 4px 12px rgba(15,23,42,0.08), 0 16px 40px rgba(15,23,42,0.06)',
        glow: '0 0 0 1px rgba(21,86,238,0.12), 0 8px 32px rgba(21,86,238,0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0c1222 0%, #151d2e 50%, #1a2744 100%)',
        'mesh': 'radial-gradient(at 80% 20%, rgba(21,86,238,0.15) 0%, transparent 50%), radial-gradient(at 20% 80%, rgba(6,182,212,0.1) 0%, transparent 50%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
