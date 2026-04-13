import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050507',
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a24',
          600: '#22222e',
        },
        gold: {
          300: '#f5e6a3',
          400: '#e8c96a',
          500: '#c9a227',
          600: '#a8841f',
        },
        ash: {
          100: '#f4f3f1',
          200: '#e8e6e1',
          400: '#b5b2ac',
          600: '#7a776f',
          800: '#3d3b36',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('/noise.png')",
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
