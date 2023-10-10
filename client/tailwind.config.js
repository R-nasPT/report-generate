/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'thai-sarabunPSK': ['TH Sarabun PSK', 'sans-serif'],
        'thai-sarabunNew': ['THsarabun', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

