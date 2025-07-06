/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neuro': '#e0e5ec',
        'neuro-surface': '#e0e5ec',
        'neuro-light': '#ffffff',
        'neuro-dark': '#a3b1c6',
        'neuro-darker': '#9baacf',
        'neuro-accent': '#4f46e5',
        'neuro-accent-light': '#6366f1',
        'neuro-success': '#10b981',
        'neuro-warning': '#f59e0b',
        'neuro-error': '#ef4444',
        'neuro-text': '#374151',
        'neuro-text-light': '#6b7280',
        'neuro-text-lighter': '#9ca3af',
        'neuro-primary': '#374151',
        'neuro-secondary': '#6b7280',
        'neuro-muted': '#9ca3af',
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}