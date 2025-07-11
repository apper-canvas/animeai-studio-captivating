/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anime-pink': '#E91E63',
        'anime-purple': '#7C4DFF',
        'anime-cyan': '#00BCD4',
        'anime-surface': '#1E1E2E',
        'anime-bg': '#121218'
      },
      fontFamily: {
        'display': ['Righteous', 'cursive'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-dance': 'border-dance 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        'border-dance': {
          '0%, 100%': { 'border-color': '#E91E63' },
          '33%': { 'border-color': '#7C4DFF' },
          '66%': { 'border-color': '#00BCD4' }
        },
        'shimmer': {
          '0%': { 'background-position': '-200px 0' },
          '100%': { 'background-position': 'calc(200px + 100%) 0' }
        }
      }
    },
  },
  plugins: [],
}