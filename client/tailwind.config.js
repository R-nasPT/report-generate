/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'thai-sarabun': ['TH Sarabun PSK', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

