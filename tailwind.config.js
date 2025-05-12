/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ellipsis: {
          '0%': { content: '""' },
          '25%': { content: '"."' },
          '50%': { content: '".."' },
          '75%': { content: '"..."' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        ellipsis: 'ellipsis 1.5s infinite',
      }
    },
  },
  plugins: [],
} 