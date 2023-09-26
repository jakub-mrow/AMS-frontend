/** @type {import('tailwindcss').Config} */

const theme = require('./src/config/theme');


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        white: theme.palette.white.main,
        black: theme.palette.black.main,
      },
    },
  },
  plugins: [],
}

