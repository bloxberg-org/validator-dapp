/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        content: "1000px",
      },
    },
    colors: {
      background: "#29404f",
      "background-header": "#1c2b36",
      "link-active": "#e01d6c",
      "link-inactive": "#ffffff",
      white: "#ffffff",
      "light-grey": "#f7f7f7",
      grey: "#777",
      "light-blue": "#aecbd3",
    },
  },
  plugins: [],
};
