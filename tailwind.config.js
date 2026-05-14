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
        gold: {
          DEFAULT:    '#B8924A',
          primary:    '#B8924A',
          accessible: '#D4A853',
          muted:      '#9B7A38',
          light:      '#D4AF72',
          dark:       '#8B6A2E',
        },
        surface: {
          base:    '#0A0A0A',
          raised:  '#111111',
          card:    '#141414',
          overlay: '#1A1A1A',
          hover:   '#282620',
          border:  '#242420',
          divider: '#2E2E28',
          muted:   '#3A3A32',
          subtle:  '#4A4A3E',
          mid:     '#6B6B5A',
        },
        neutral: {
          50:  '#FDFCFA',
          100: '#F9F6F1',
          200: '#F0EDE6',
          300: '#E4DFD5',
          400: '#CEC7B9',
          500: '#B4AD9F',
          600: '#958D80',
          700: '#7A7268',
          800: '#5C5650',
          900: '#3D3830',
        },
        state: {
          'success':            '#4B7A5E',
          'success-subtle':     '#6EAF87',
          'success-deep':       '#2E5C42',
          'success-bg':         '#0F2018',
          'warning':            '#B87A20',
          'warning-subtle':     '#D4963C',
          'warning-deep':       '#8B5C18',
          'warning-bg':         '#201808',
          'info':               '#4A7870',
          'info-subtle':        '#66ADA4',
          'info-deep':          '#2E5A54',
          'info-bg':            '#0C1E1C',
          'destructive':        '#B84438',
          'destructive-subtle': '#E06858',
          'destructive-deep':   '#8B2E24',
          'destructive-bg':     '#1E0E0C',
        },
        'near-black':      '#0A0A0A',
        'card-black':      '#141414',
        'body-text':       '#1A1A1A',
        'muted-text':      '#5C5C5C',
        'muted-text-dark': '#8F8F8F',
        offwhite:          '#F9F6F1',
        dark: {
          hero:     '#0A0A0A',
          card:     '#141414',
          charcoal: '#1A1A1A',
        },
        muted: '#5C5C5C',
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
        hero:        ['clamp(2.5rem, 8vw, 5rem)',    { lineHeight: '1.1',  fontWeight: '800' }],
        h1:          ['clamp(2rem, 6vw, 4rem)',       { lineHeight: '1.15', fontWeight: '800' }],
        h2:          ['clamp(1.75rem, 4.5vw, 3rem)',  { lineHeight: '1.2',  fontWeight: '700' }],
        h3:          ['clamp(1.25rem, 3vw, 2rem)',    { lineHeight: '1.3',  fontWeight: '600' }],
        subheading:  ['clamp(1.05rem, 2vw, 1.5rem)',  { lineHeight: '1.4',  fontWeight: '600' }],
        'body-lg':   ['clamp(1rem, 1.2vw, 1.125rem)', { lineHeight: '1.7'  }],
        'body-base': ['16px',                          { lineHeight: '1.7'  }],
        caption:     ['14px',                          { lineHeight: '1.6'  }],
        label:       ['13px',                          { lineHeight: '1.5'  }],
      },
      backgroundImage: {
        'gold-gradient':        'linear-gradient(135deg, #C9A050 0%, #EAC96A 50%, #9E7A3D 100%)',
        'gold-gradient-legacy': 'linear-gradient(135deg, #B8924A 0%, #D4AF72 50%, #8B6A2E 100%)',
        'hero-gradient':        'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)',
        'dark-hero':            'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)',
        'gold-glow':            'radial-gradient(ellipse at center, rgba(201,160,80,0.12) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-sm':           '0 2px 8px rgba(184,146,74,0.15)',
        'gold-md':           '0 4px 20px rgba(184,146,74,0.25)',
        'gold-lg':           '0 8px 40px rgba(184,146,74,0.40)',
        'gold-sm-light':     '0 2px 8px rgba(139,106,46,0.12)',
        'gold-md-light':     '0 4px 20px rgba(139,106,46,0.20)',
        'gold-lg-light':     '0 8px 40px rgba(139,106,46,0.30)',
        'success-sm':        '0 2px 8px rgba(75,122,94,0.25)',
        'destructive-sm':    '0 2px 8px rgba(184,68,56,0.25)',
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
