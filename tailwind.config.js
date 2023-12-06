/** @type {import('tailwindcss').Config} */

const theme = require('./src/config/theme');


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        white: theme.palette.white.main,
        black: theme.palette.black.main,
      },
      fontFamily: {
        poppins: [
          'Poppins',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
        'sans': ['Fugaz One', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

