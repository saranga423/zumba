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
        marquee: {
        "0%":   { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-50%)" },
      },
          "marquee-reverse": {
        "0%":   { transform: "translateX(-50%)" },
        "100%": { transform: "translateX(0%)" },
      },
      },
      animation: {
      "marquee":         "marquee 30s linear infinite",
      "marquee-reverse": "marquee-reverse 30s linear infinite",
    },
    },
  },
  plugins: [],
}