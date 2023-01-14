/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme': '#7b2cbf',
      },
      height: {
        5: '5%',
        10: '10%',
        85: '85%',
      },
      boxShadow: {
        'md': '0 0px 20px 2px rgba(0, 0, 0, 0.2)',
      }

    },
  },
  plugins: [],
}
