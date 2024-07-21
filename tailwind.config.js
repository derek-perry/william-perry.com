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
          wpRedDark: '#702828',
          wpGrey: '#E5E5E5',
          wpGreyLight: '#F5F5F5',
          wpGreyLighter: '#F9F9F9',
      }
    },
  },
  plugins: []
}
