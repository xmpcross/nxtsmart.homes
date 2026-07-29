import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand / action — a crisp modern electric blue.
        primary: {
          DEFAULT: '#2563eb',
          emphasis: '#1d4ed8',
          hover: '#dbe6ff',
          pressed: '#1e40af',
          soft: '#eef3ff',
        },
        // Secondary — a smart "active/on" teal (energy, connectivity).
        accent: {
          DEFAULT: '#14b8a6',
          emphasis: '#0d9488',
          soft: '#effcf9',
        },
        // Cool, near-black neutrals for a precise, device-UI feel.
        ink: {
          DEFAULT: '#0d1117',
          muted: '#4b5563',
          faint: '#98a2b3',
        },
        paper: '#f6f7f9',
        surface: '#ffffff',
        muted: '#eef1f6',
        dark: {
          DEFAULT: '#0a0d12',
          surface: '#12161d',
          border: 'rgba(255,255,255,0.07)',
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
        card: '0 1px 2px rgba(13,17,23,0.05), 0 6px 20px rgba(13,17,23,0.035)',
        'card-hover': '0 2px 8px rgba(13,17,23,0.06), 0 14px 36px rgba(13,17,23,0.06)',
        glow: '0 0 0 1px rgba(37,99,235,0.14), 0 6px 26px rgba(37,99,235,0.14)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(140deg, #0a0d12 0%, #12161d 55%, #131d2e 100%)',
        'mesh': 'radial-gradient(at 82% 18%, rgba(37,99,235,0.16) 0%, transparent 52%), radial-gradient(at 16% 84%, rgba(20,184,166,0.12) 0%, transparent 50%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
