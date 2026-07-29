import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Single accent — a smart "active/on" teal (energy, connectivity),
        // tuned to read as a bright highlight on near-black surfaces.
        primary: {
          DEFAULT: '#2dd4bf',
          emphasis: '#14b8a6',
          hover: 'rgba(45,212,191,0.16)',
          pressed: '#0d9488',
          soft: 'rgba(45,212,191,0.10)',
        },
        accent: {
          DEFAULT: '#2dd4bf',
          emphasis: '#14b8a6',
          soft: 'rgba(45,212,191,0.10)',
        },
        // Dark-first neutrals. `ink` is now light (text on dark), so existing
        // `text-ink` / `border-ink/8` utilities become light-on-dark for free.
        ink: {
          DEFAULT: '#e9ecf1',
          muted: '#9aa1ad',
          faint: '#616a76',
        },
        // Near-black page + slightly raised card/muted surfaces.
        paper: '#08090c',
        surface: '#0f1116',
        muted: '#171a21',
        dark: {
          DEFAULT: '#08090c',
          surface: '#0f1116',
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
        card: '0 1px 0 rgba(255,255,255,0.02) inset, 0 8px 30px rgba(0,0,0,0.45)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.04) inset, 0 16px 44px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(45,212,191,0.22), 0 8px 34px rgba(45,212,191,0.14)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #0a0c10 0%, #08090c 100%)',
        'mesh':
          'radial-gradient(at 78% 12%, rgba(45,212,191,0.14) 0%, transparent 50%), radial-gradient(at 12% 88%, rgba(45,212,191,0.06) 0%, transparent 55%)',
        // Optimus-style technical dot grid for hero / dark sections.
        'grid-dots':
          'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
        'grid-lines':
          'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-dots': '22px 22px',
        'grid-lines': '56px 56px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
