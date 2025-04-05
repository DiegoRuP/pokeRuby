/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gba: ['pokefont', 'monospace'],
      },
    },
  },
  plugins: [],
}

