/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        hero: ['80px', { lineHeight: '1.1', fontWeight: '800' }],
        h1: ['64px', { lineHeight: '1.15', fontWeight: '800' }],
        h2: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        subheading: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'body-base': ['16px', { lineHeight: '1.7' }],
        caption: ['14px', { lineHeight: '1.6' }],
        label: ['13px', { lineHeight: '1.5' }],
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
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
      },
    },
  },
  plugins: [],
}
