/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        15: '15%',
        55: '55%',
      }
    },
  },
  plugins: [],
}
