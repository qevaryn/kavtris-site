import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/data/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#031426',
          900: '#071F35',
          800: '#0A1B30'
        },
        gold: {
          600: '#7A4E00',
          500: '#F2B632'
        },
        paper: '#F8F8F6',
        borderline: '#E6E7E8'
      },
      boxShadow: {
        glow: '0 18px 45px rgba(3, 20, 38, 0.12)'
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
