/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
          wpBlack: '#0A0A0A',
          wpWhite: '#F7F5F5',
          wpRed: '#853535',
          wpRedLight: '#924A4A',
          wpRedDark: '#702828'
      }
    },
  },
  plugins: []
}
