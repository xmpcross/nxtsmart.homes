import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // NXTSmart.Homes palette — primary blue per brand spec
        primary: {
          DEFAULT: '#1556ee',
          emphasis: '#0f43c0',
          hover: '#c8d6fb',
          pressed: '#0c389f',
        },
        accent: {
          DEFAULT: '#F59E0B',
          emphasis: '#D97706',
        },
        ink: '#0F172A',
        paper: '#FAFAF9',
        muted: '#F1F5F9',
      },
      fontFamily: {
        // Single font for the whole site — Inter, self-hosted.
        // CSS variable defined in globals.css via @font-face.
        sans: ['var(--font-inter)'],
        display: ['var(--font-inter)'],
        // Aliases kept so existing `font-urbanist` / `font-outfit` utilities
        // still resolve. Both point at Inter.
        urbanist: ['var(--font-inter)'],
        outfit: ['var(--font-inter)'],
      },
      maxWidth: { prose: '70ch' },
      borderRadius: {
        '3xl': '0.75rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
