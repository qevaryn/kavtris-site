import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/data/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#031426',
          900: '#071F35',
          800: '#0A1B30',
          700: '#102A43'
        },
        gold: {
          600: '#8A5A00',
          500: '#F2B632'
        },
        // KAVTRIS frozen brand palette (BRAND.1C/BRAND.2B source-of-truth).
        // kavtris-blueLight is a same-family light render variant used only
        // for text/focus on dark surfaces where base blue fails WCAG AA.
        kavtris: {
          blue: '#065AFD',
          blueLight: '#3D7BFF',
          dark: '#010619',
          light: '#F8FAFD',
          navy: '#030714'
        },
        paper: '#F8F6F1',
        mist: '#F1F5F8',
        stone: '#F5F5F3',
        muted: '#526173',
        borderline: '#DFE4E8'
      },
      boxShadow: {
        glow: '0 18px 45px rgba(3, 20, 38, 0.12)',
        card: '0 18px 55px rgba(3, 20, 38, 0.1)'
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif']
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
