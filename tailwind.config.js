/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#FF2D78',
        yellow: '#FFD600',
        orange: '#FF6B35',
        dark: '#1A1A2E',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.12' },
          '50%': { transform: 'scale(1.08)', opacity: '0.2' },
        },
      },
      animation: {
        pulseSlow: 'pulseSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}