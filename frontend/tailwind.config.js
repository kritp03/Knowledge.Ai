/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        5: '5%',
        10: '10%',
        85: '85%',
      }
    },
  },
  plugins: [],
}
