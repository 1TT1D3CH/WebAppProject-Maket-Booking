/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
        }
      },
      fontFamily: {
        sans: ['Prompt', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      // Override font sizes to include taller line-height for Thai vowels/tone marks
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.4rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.6rem' }],
        'base': ['1rem',     { lineHeight: '1.75rem' }],
        'lg':   ['1.125rem', { lineHeight: '1.9rem' }],
        'xl':   ['1.25rem',  { lineHeight: '2rem' }],
      },
      lineHeight: {
        'thai': '1.9',
        'relaxed': '1.75',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'floating': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
