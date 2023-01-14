/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
theme: {
  extend: {
    colors: {
      purple: "#9041b5",
      secondary: "#fbfbfb",
      primary: "#ffffff",
      secondaryColor: "#fbfbfb",
      placeholderColor: "#9ca3af",
      rejectionStatusColor: "#eb1313",
      goodStatusColor: "#4aab88",
      greenProgressColor: "#06D186",
    },
    height: {
      416: "26rem",
      128: "32rem",
      576: "36rem",
      608: "38rem",
      640: "40rem",
      90: "90%",
      85: "85%",
      five: "5%",
      ten: "10%",
      fiftyfive: "55%",
    },
    width: {
      ten: "10%",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
},
plugins: [],
}
