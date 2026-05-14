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
  darkMode: 'class',
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
        // ── Gold Variants (3 total — see usage rules in globals.css) ──────────
        // gold.DEFAULT   → #B8924A  decorative only: borders, shadows, gradient fills, large bold text ≥18px/700w on dark
        // gold.accessible → #D4A853  AA-compliant small text, icons, interactive labels on dark (≥8.2:1 on surface.card)
        // gold.muted     → #9B7A38  disabled gold on dark, hover midpoint from accessible downward
        gold: {
          DEFAULT:    '#B8924A',   // HSL 35 51% 51%  — decorative
          primary:    '#B8924A',   // alias for DEFAULT — used site-wide
          accessible: '#D4A853',   // HSL 35 55% 57%  — AA small text on dark
          muted:      '#9B7A38',   // HSL 35 45% 42%  — disabled / subdued
          light:      '#D4AF72',   // legacy alias
          dark:       '#8B6A2E',   // legacy alias
        },

        // ── Surface Scale — warm dark side (10 steps) ─────────────────────────
        surface: {
          base:    '#0A0A0A',   // HSL 0 0% 4%    — page base, hero bg
          raised:  '#111111',   // HSL 0 0% 7%    — slight elevation above base
          card:    '#141414',   // HSL 0 0% 8%    — card / panel bg
          overlay: '#1A1A1A',   // HSL 0 0% 10%   — drawers, popovers on dark
          hover:   '#282620',   // HSL 38 5% 15%  — FIXED from #202018 (1.13:1 vs card, imperceptible on IPS); paired with gold border in .admin-row
          border:  '#242420',   // HSL 40 4% 14%  — subtle borders on dark
          divider: '#2E2E28',   // HSL 42 6% 17%  — dividers
          muted:   '#3A3A32',   // HSL 44 8% 21%  — very muted dark surfaces
          subtle:  '#4A4A3E',   // HSL 46 9% 27%  — subtle mid-dark
          mid:     '#6B6B5A',   // HSL 46 10% 39% — midpoint warm neutral
        },

        // ── Neutral Scale — warm light side (10 steps) ────────────────────────
        neutral: {
          50:  '#FDFCFA',   // HSL 40 40% 99%  — brightest warm white
          100: '#F9F6F1',   // HSL 38 33% 96%  — off-white (brand offwhite)
          200: '#F0EDE6',   // HSL 36 29% 92%  — slightly warmer
          300: '#E4DFD5',   // HSL 34 24% 86%  — light warm gray
          400: '#CEC7B9',   // HSL 34 19% 77%  — warm mid-light
          500: '#B4AD9F',   // HSL 34 12% 66%  — midpoint
          600: '#958D80',   // HSL 34 10% 54%  — medium warm gray
          700: '#7A7268',   // HSL 33 9% 45%   — medium-dark
          800: '#5C5650',   // HSL 20 7% 34%   — dark warm gray
          900: '#3D3830',   // HSL 25 12% 22%  — very dark warm
        },

        // ── Semantic State Colors (warm undertones — no cool blues) ────────────
        // Each has a base, on-dark (light variant), and on-light (dark variant)
        state: {
          // Success — warm jade-green
          'success':        '#4B7A5E',   // HSL 148 24% 39%
          'success-subtle': '#6EAF87',   // HSL 148 26% 55%  — on dark backgrounds
          'success-deep':   '#2E5C42',   // HSL 148 33% 27%  — on light backgrounds
          'success-bg':     '#0F2018',   // HSL 148 35% 10%  — tinted surface on dark

          // Warning — amber-ochre
          'warning':        '#B87A20',   // HSL 35 71% 42%
          'warning-subtle': '#D4963C',   // HSL 35 64% 53%  — on dark backgrounds
          'warning-deep':   '#8B5C18',   // HSL 35 71% 31%  — on light backgrounds
          'warning-bg':     '#201808',   // HSL 35 65% 8%   — tinted surface on dark

          // Info — warm sage / teal
          'info':           '#4A7870',   // HSL 174 24% 38%
          'info-subtle':    '#66ADA4',   // HSL 174 26% 54%  — on dark backgrounds
          'info-deep':      '#2E5A54',   // HSL 174 33% 26%  — on light backgrounds
          'info-bg':        '#0C1E1C',   // HSL 174 35% 9%   — tinted surface on dark

          // Destructive — warm brick (no harsh cool red)
          'destructive':        '#B84438',   // HSL 5 51% 47%
          'destructive-subtle': '#E06858',   // HSL 8 67% 61%  — on dark backgrounds
          'destructive-deep':   '#8B2E24',   // HSL 5 57% 35%  — on light backgrounds
          'destructive-bg':     '#1E0E0C',   // HSL 5 35% 9%   — tinted surface on dark
        },

        // ── Legacy aliases — kept so all existing components continue to work ──
        'near-black':  '#0A0A0A',
        'card-black':  '#141414',
        'body-text':   '#1A1A1A',
        'muted-text':  '#5C5C5C',   // FIXED: was #6B6B6B (failed on some surfaces); now 6.05:1 on off-white
        'muted-text-dark': '#8F8F8F', // NEW: muted text on dark card surfaces — 5.72:1 on #141414
        offwhite:      '#F9F6F1',
        dark: {
          hero:     '#0A0A0A',
          card:     '#141414',
          charcoal: '#1A1A1A',
        },
        muted: '#5C5C5C',

        // ── shadcn/ui CSS variable tokens ─────────────────────────────────────
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        lg:   'var(--radius)',
        md:   'calc(var(--radius) - 2px)',
        sm:   'calc(var(--radius) - 4px)',
        card: '16px',
        pill: '9999px',
      },

      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body:    ['Open Sans', 'sans-serif'],
      },

      fontSize: {
        hero:       ['clamp(2.5rem, 8vw, 5rem)',   { lineHeight: '1.1',  fontWeight: '800' }],
        h1:         ['clamp(2rem, 6vw, 4rem)',      { lineHeight: '1.15', fontWeight: '800' }],
        h2:         ['clamp(1.75rem, 4.5vw, 3rem)', { lineHeight: '1.2',  fontWeight: '700' }],
        h3:         ['clamp(1.25rem, 3vw, 2rem)',   { lineHeight: '1.3',  fontWeight: '600' }],
        subheading: ['clamp(1.05rem, 2vw, 1.5rem)', { lineHeight: '1.4',  fontWeight: '600' }],
        'body-lg':  ['clamp(1rem, 1.2vw, 1.125rem)',{ lineHeight: '1.7'  }],
        'body-base':['16px',                         { lineHeight: '1.7'  }],
        caption:    ['14px',                         { lineHeight: '1.6'  }],
        label:      ['13px',                         { lineHeight: '1.5'  }],
      },

      backgroundImage: {
        // Refined gradient — shifts slightly lighter for better legibility at midpoint
        // Use ONLY on large bold text (≥18px/700w), buttons, and decorative surfaces
        'gold-gradient':  'linear-gradient(135deg, #C9A050 0%, #EAC96A 50%, #9E7A3D 100%)',
        // Original preserved as legacy alias for existing utility classes
        'gold-gradient-legacy': 'linear-gradient(135deg, #B8924A 0%, #D4AF72 50%, #8B6A2E 100%)',
        'hero-gradient':  'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)',
        'dark-hero':      'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)',
        'gold-glow':      'radial-gradient(ellipse at center, rgba(201,160,80,0.12) 0%, transparent 70%)',
        // Refined glow — reduced opacity avoids over-aggressive bloom
      },

      boxShadow: {
        // Dark-surface shadows (tuned down from aggressive originals)
        'gold-sm': '0 2px 8px rgba(184,146,74,0.15)',
        'gold-md': '0 4px 20px rgba(184,146,74,0.25)',
        'gold-lg': '0 8px 40px rgba(184,146,74,0.40)',
        // Light-surface shadows (more subtle — gold on light needs less opacity)
        'gold-sm-light': '0 2px 8px rgba(139,106,46,0.12)',
        'gold-md-light': '0 4px 20px rgba(139,106,46,0.20)',
        'gold-lg-light': '0 8px 40px rgba(139,106,46,0.30)',
        // State shadows
        'success-sm': '0 2px 8px rgba(75,122,94,0.25)',
        'destructive-sm': '0 2px 8px rgba(184,68,56,0.25)',
      },

      animation: {
        float:        'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'in':         'in 0.2s ease-out',
        'out':        'out 0.2s ease-in',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,168,83,0.4)' },
          '50%':      { boxShadow: '0 0 0 10px rgba(212,168,83,0)' },
        },
        'in': {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'out': {
          '0%':   { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
