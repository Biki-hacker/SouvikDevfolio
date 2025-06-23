/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff0000',
        dark: {
          DEFAULT: '#1a1a1a',
          lighter: '#2d2d2d',
        },
        light: {
          DEFAULT: '#ffffff',
          darker: '#f5f5f5',
        }
      },
      animation: {
        'wave': 'wave 2s linear infinite',
        'text-change': 'textChange 8s linear infinite',
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        textChange: {
          '0%, 20%': { content: '"Hello"' },
          '25%, 45%': { content: '"Namaste"' },
          '50%, 70%': { content: '"Hola"' },
          '75%, 100%': { content: '"Bonjour"' },
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        }
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 