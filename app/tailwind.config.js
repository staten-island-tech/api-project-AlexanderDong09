/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      purple: "rgba(87,75,167, 0.50)",
      lightblue: "#717fe1",
      cream: "#fffce9",
    },
  },
  extend: {},

  plugins: [require("daisyui")],
};
