import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    join(__dirname, './index.html'),
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './src/components/ui/**/*.{ts,tsx}'),
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // ── Brand colors (preserved) ──────────────────────────────────
        gold: {
          primary: '#B8924A',
          light: '#D4AF72',
          dark: '#8B6A2E',
        },
        'near-black': '#0A0A0A',
        'card-black': '#141414',
        'body-text': '#1A1A1A',
        'muted-text': '#6B6B6B',
        offwhite: '#F9F6F1',
        // Legacy aliases kept so existing components don't break
        dark: {
          hero: '#0A0A0A',
          card: '#141414',
          charcoal: '#1A1A1A',
        },
        muted: '#6B6B6B',
        // ── shadcn/ui CSS variable tokens ─────────────────────────────
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Brand radii (preserved)
        card: '16px',
        pill: '9999px',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.1', fontWeight: '800' }],
        h1: ['clamp(2rem, 6vw, 4rem)', { lineHeight: '1.15', fontWeight: '800' }],
        h2: ['clamp(1.75rem, 4.5vw, 3rem)', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['clamp(1.25rem, 3vw, 2rem)', { lineHeight: '1.3', fontWeight: '600' }],
        subheading: ['clamp(1.05rem, 2vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.7' }],
        'body-base': ['16px', { lineHeight: '1.7' }],
        caption: ['14px', { lineHeight: '1.6' }],
        label: ['13px', { lineHeight: '1.5' }],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8924A 0%, #D4AF72 50%, #8B6A2E 100%)',
        'hero-gradient': 'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)',
        'dark-hero': 'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)',
        'gold-glow': 'radial-gradient(ellipse at center, rgba(184,146,74,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(184,146,74,0.2)',
        'gold-md': '0 4px 24px rgba(184,146,74,0.35)',
        'gold-lg': '0 8px 48px rgba(184,146,74,0.5)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'in': 'in 0.2s ease-out',
        'out': 'out 0.2s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184,146,74,0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(184,146,74,0)' },
        },
        'in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
